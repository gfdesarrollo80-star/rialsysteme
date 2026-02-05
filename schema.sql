
-- FASE 2: ESQUEMA INICIAL DE LA BASE DE DATOS SUPABASE

CREATE TABLE roles (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(50) NOT NULL
);

CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    usuario VARCHAR(100) UNIQUE NOT NULL,
    contrasena TEXT NOT NULL,
    rol_id INTEGER REFERENCES roles(id),
    activo BOOLEAN DEFAULT TRUE
);

CREATE TABLE bancos (
    id SERIAL PRIMARY KEY,
    nombre VARCHAR(100),
    numero VARCHAR(50)
);

CREATE TABLE acreedores (
    id SERIAL PRIMARY KEY,
    cliente VARCHAR(100),
    cedula VARCHAR(50),
    utilidad_agente NUMERIC,
    entidad VARCHAR(100),
    monto NUMERIC,
    metodo_pago VARCHAR(50),
    agente VARCHAR(100),
    tipo VARCHAR(50),
    empresa VARCHAR(100),
    fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fondo_inversion (
    id SERIAL PRIMARY KEY,
    cliente VARCHAR(100),
    prov VARCHAR(100),
    capital NUMERIC,
    utilidad_empresa NUMERIC,
    utilidad_agente NUMERIC,
    bolsa_captacion NUMERIC,
    interes_iva NUMERIC,
    control_procesos NUMERIC,
    costo_desembolso NUMERIC,
    total_cobrado NUMERIC,
    total_depositar NUMERIC,
    total_ingresado NUMERIC,
    agente VARCHAR(100),
    forma_cobro VARCHAR(50),
    banco VARCHAR(50),
    tipo VARCHAR(50),
    firmas VARCHAR(200),
    utt_inversor NUMERIC,
    utt_real NUMERIC,
    fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE fondo_fijo_gastos (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    proveedor VARCHAR(100),
    detalle TEXT,
    numero_factura VARCHAR(50),
    monto NUMERIC,
    metodo VARCHAR(50)
);

CREATE TABLE fondo_fijo_ingresos (
    id SERIAL PRIMARY KEY,
    fecha DATE,
    detalle TEXT,
    monto NUMERIC
);

CREATE TABLE transferencias (
    id SERIAL PRIMARY KEY,
    origen VARCHAR(100),
    destino VARCHAR(100),
    monto NUMERIC,
    fecha TIMESTAMP DEFAULT NOW()
);

CREATE TABLE reporte_diario (
    id SERIAL PRIMARY KEY,
    fecha DATE UNIQUE,
    saldo_inicial_efectivo NUMERIC,
    saldo_inicial_banco1 NUMERIC,
    saldo_inicial_banco2 NUMERIC,
    saldo_inicial_banco3 NUMERIC,
    saldo_final_efectivo NUMERIC,
    saldo_final_banco1 NUMERIC,
    saldo_final_banco2 NUMERIC,
    saldo_final_banco3 NUMERIC
);

CREATE TABLE auditoria (
    id SERIAL PRIMARY KEY,
    usuario_id INTEGER REFERENCES usuarios(id),
    accion VARCHAR(200),
    tabla_afectada VARCHAR(100),
    registro_id INTEGER,
    fecha TIMESTAMP DEFAULT NOW()
);
