-- Tabla de mensajes
CREATE TABLE IF NOT EXISTS messages (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT NOT NULL,
  service TEXT NOT NULL,
  message TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'read', 'responded')),
  response TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Tabla de auto-respuestas
CREATE TABLE IF NOT EXISTS auto_replies (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  message TEXT NOT NULL,
  active BOOLEAN DEFAULT false,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para mejorar el rendimiento
CREATE INDEX IF NOT EXISTS idx_messages_status ON messages(status);
CREATE INDEX IF NOT EXISTS idx_messages_created_at ON messages(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_messages_email ON messages(email);

-- Función para actualizar updated_at automáticamente
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger para messages
DROP TRIGGER IF EXISTS update_messages_updated_at ON messages;
CREATE TRIGGER update_messages_updated_at
  BEFORE UPDATE ON messages
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Trigger para auto_replies
DROP TRIGGER IF EXISTS update_auto_replies_updated_at ON auto_replies;
CREATE TRIGGER update_auto_replies_updated_at
  BEFORE UPDATE ON auto_replies
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Insertar configuración inicial de auto-respuestas si no existe
INSERT INTO auto_replies (message, active)
SELECT 
  'Gracias por contactarnos. Hemos recibido tu mensaje y nos pondremos en contacto contigo pronto.',
  false
WHERE NOT EXISTS (SELECT 1 FROM auto_replies LIMIT 1);

-- Políticas de seguridad (Row Level Security)
-- Nota: Ajusta estas políticas según tus necesidades de autenticación

-- Habilitar RLS
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE auto_replies ENABLE ROW LEVEL SECURITY;

-- Permitir inserción pública de mensajes (para el formulario de contacto)
CREATE POLICY "Allow public insert on messages" ON messages
  FOR INSERT
  WITH CHECK (true);

-- Para las demás operaciones, se requeriría autenticación
-- Ejemplo: permitir lectura solo a usuarios autenticados
-- CREATE POLICY "Allow authenticated read on messages" ON messages
--   FOR SELECT
--   USING (auth.role() = 'authenticated');

-- Para desarrollo, puedes permitir todas las operaciones (NO RECOMENDADO PARA PRODUCCIÓN)
CREATE POLICY "Allow all operations on messages" ON messages
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow all operations on auto_replies" ON auto_replies
  USING (true)
  WITH CHECK (true);

