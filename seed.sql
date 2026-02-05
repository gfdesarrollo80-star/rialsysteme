
-- Insert roles
INSERT INTO roles (nombre) VALUES 
('colaborador'), 
('visualizacion');

-- Insert admin user
INSERT INTO usuarios (nombre, usuario, contrasena, rol_id, activo)
VALUES ('Administrador', 'admin', '$2a$10$ reemplaza_esto_con_hash', 1, TRUE);
