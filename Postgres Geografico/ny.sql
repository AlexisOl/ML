
-- referencia geografica dado un mapa
select  ST_Transform(nn.geom , 4326), nn."name"
from nyc_neighborhoods nn
;




-- busqueda por nombre de barrio
select  ST_Transform(nn.geom , 4326), nn."name"
from nyc_neighborhoods nn
where nn.boroname  = 'Brooklyn'
;

-- solo calles
select  ST_Transform(ns.geom , 4326), ns."name"
from nyc_streets ns ;
