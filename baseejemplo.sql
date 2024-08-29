-- Crear la base de datos
CREATE DATABASE crud_example;

-- Usar la base de datos creada
USE crud_example;

-- Crear la tabla
CREATE TABLE usuarios (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insertar algunos datos de ejemplo (opcional)
INSERT INTO usuarios (name, email) VALUES
('Juan Pérez', 'juan@example.com'),
('María López', 'maria@example.com'),
('Carlos García', 'carlos@example.com');
