from flask import Flask, request, jsonify
import psycopg2

app = Flask(__name__)

def obtenerConexion():
    return psycopg2.connect(

    );