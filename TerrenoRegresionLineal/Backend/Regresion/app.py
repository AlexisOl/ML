from flask import Flask, jsonify
import psycopg2
from dotenv import load_dotenv
import os
import requests
from sklearn.cluster import KMeans

import numpy as np
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import StandardScaler


load_dotenv()

app = Flask(__name__)
NODE_MICROSERVICE_URL = "http://localhost:3001/terrenos/"  


@app.route('/terrenos')
def obtener_departamentos_desde_node():
    try:
        response = requests.get(NODE_MICROSERVICE_URL)
        response.raise_for_status() 
        datos = response.json()
        return jsonify(datos)
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

@app.route('/regresionLineal')
def regresionLineal():
    try:
        response = requests.get(NODE_MICROSERVICE_URL)
        response.raise_for_status() 
        datos = response.json()

        ## determina la regresion lineal entre, area, precio y ubicacion
        valores_x = []
        valores_y = []
        coordenadas = []

        # escala
        scaler_x = StandardScaler()
        scaler_y = StandardScaler()

        for i in datos:
            if(i['dearea'] and i['precio']):
                area = float(i['dearea'])
                precio = float(i['precio'])
                lat = float(i["centroide"]["coordinates"][0])
                lon = float(i["centroide"]["coordinates"][1])
                    
            valores_x.append([area])
            valores_y.append([precio])
            coordenadas.append([lat, lon])

        # CREACION DEL MODELO
        cluster = KMeans(n_clusters = 3, random_state = 0);
        total_clusters = cluster.fit_predict(coordenadas);

        for i in range(len(valores_x)):
            valores_x[i].append(total_clusters[i])

        valores_x_scaled = scaler_x.fit_transform(valores_x)
        valores_y_scaled = scaler_y.fit_transform(valores_y)
        ## genera una regresion lineal solo de area y precio que es correlacional
        modelo = LinearRegression();
        modelo.fit(valores_x_scaled, valores_y_scaled)
        ## aca generar una prediccion en base a un nuevo valor
        nuevo_area = 10000
        nueva_coord = [-90.1, 14.65]
        nuevo_cluster = cluster.predict([nueva_coord])[0]

        prediccion = scaler_x.transform([[nuevo_area, nuevo_cluster]])
        prediccion_con_cluster = modelo.predict(prediccion)
        prediccion_final = scaler_y.inverse_transform(prediccion_con_cluster)

        return jsonify({
            "prediccion_precio": prediccion_final[0][0],
            "cluster": int(nuevo_cluster),

        })
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)