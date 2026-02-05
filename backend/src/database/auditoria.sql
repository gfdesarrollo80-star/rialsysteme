-- Tablas de auditoría

CREATE TABLE IF NOT EXISTS auditoria_movimientos (
 id SERIAL PRIMARY KEY,
 usuario_id INTEGER,
 tabla VARCHAR(100),
 accion VARCHAR(20),
 fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS auditoria_accesos (
 id SERIAL PRIMARY KEY,
 usuario_id INTEGER,
 fecha TIMESTAMP DEFAULT NOW(),
 ip VARCHAR(100),
 estado VARCHAR(50)
);
