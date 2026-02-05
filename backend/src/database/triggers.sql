-- Trigger genérico de auditoría
CREATE OR REPLACE FUNCTION auditoria_trigger()
RETURNS TRIGGER AS $$
BEGIN
 INSERT INTO auditoria_movimientos(usuario_id, tabla, accion)
 VALUES (current_setting('app.current_user', true)::INTEGER, TG_TABLE_NAME, TG_OP);
 RETURN NEW;
END;
$$ LANGUAGE plpgsql;
