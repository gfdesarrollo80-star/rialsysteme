
-- Auditoría automática

CREATE OR REPLACE FUNCTION registrar_auditoria()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO auditoria(usuario_id, accion, tabla_afectada, registro_id)
  VALUES (current_setting('app.current_user')::INTEGER, TG_OP, TG_TABLE_NAME, NEW.id);
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Ejemplo aplicando a acreedores
CREATE TRIGGER auditoria_acreedores
AFTER INSERT OR UPDATE OR DELETE ON acreedores
FOR EACH ROW EXECUTE FUNCTION registrar_auditoria();
