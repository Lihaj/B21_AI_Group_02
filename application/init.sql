DROP TABLE IF EXISTS inventory;
DROP TABLE IF EXISTS sales;
DROP TABLE IF EXISTS plants;
DROP TABLE IF EXISTS categories;

-- Create tables
CREATE TABLE IF NOT EXISTS categories (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(10) NOT NULL,
    parent_id BIGINT,
    FOREIGN KEY (parent_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS plants (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(25) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantity INT NOT NULL,
    category_id BIGINT,
    FOREIGN KEY (category_id) REFERENCES categories(id) ON DELETE SET NULL
);

CREATE TABLE IF NOT EXISTS sales (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plant_id BIGINT NOT NULL,
    quantity INT NOT NULL,
    total_price DECIMAL(10, 2) NOT NULL,
    sold_at DATETIME(6),
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS inventory (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    plant_id BIGINT NOT NULL,
    quantity INT NOT NULL CHECK (quantity >= 1),
    type ENUM('IN', 'OUT') NOT NULL,
    note VARCHAR(255),
    created_at DATETIME(6),
    FOREIGN KEY (plant_id) REFERENCES plants(id) ON DELETE CASCADE
);

-- Seed categories
INSERT INTO categories (name, parent_id) VALUES ('Indoor', NULL);
INSERT INTO categories (name, parent_id) VALUES ('Outdoor', NULL);
INSERT INTO categories (name, parent_id) VALUES ('Succulents', 1);
INSERT INTO categories (name, parent_id) VALUES ('Ferns', 1);
INSERT INTO categories (name, parent_id) VALUES ('Foliage', 1);
INSERT INTO categories (name, parent_id) VALUES ('Shrubs', 2);
INSERT INTO categories (name, parent_id) VALUES ('Flowering', 2);
INSERT INTO categories (name, parent_id) VALUES ('Herbs', 1);
INSERT INTO categories (name, parent_id) VALUES ('Cacti', 3);
INSERT INTO categories (name, parent_id) VALUES ('Palms', 2);
INSERT INTO categories (name, parent_id) VALUES ('Grasses', 2);
INSERT INTO categories (name, parent_id) VALUES ('Climbers', 1);
INSERT INTO categories (name, parent_id) VALUES ('Bulbs', 7);
INSERT INTO categories (name, parent_id) VALUES ('Orchids', 1);
INSERT INTO categories (name, parent_id) VALUES ('Fruits', 2);

-- Seed plants
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Aloe Vera', 15.5, 100, 3);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Snake Plant', 25.0, 60, 3);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Boston Fern', 18.0, 40, 4);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Ficus', 30.0, 25, 5);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Monstera', 45.0, 15, 5);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Rose', 20.0, 80, 7);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Tulip', 12.0, 150, 7);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Lavender', 15.0, 90, 6);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Hydrangea', 22.5, 30, 6);
INSERT INTO plants (name, price, quantity, category_id) VALUES ('Sunflower', 10.0, 200, 7);

-- Seed sales
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (1, 2, 31.0, '2026-05-28 14:30:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (2, 1, 25.0, '2026-05-28 14:35:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (3, 3, 54.0, '2026-05-28 14:40:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (4, 1, 30.0, '2026-05-28 14:45:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (5, 2, 90.0, '2026-05-28 15:00:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (6, 5, 100.0, '2026-05-28 15:10:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (7, 10, 120.0, '2026-05-28 15:15:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (8, 4, 60.0, '2026-05-28 15:20:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (9, 2, 45.0, '2026-05-28 15:30:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (10, 5, 50.0, '2026-05-28 15:45:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (1, 1, 15.5, '2026-05-28 16:00:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (2, 2, 50.0, '2026-05-28 16:05:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (6, 2, 40.0, '2026-05-28 16:15:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (7, 5, 60.0, '2026-05-28 16:20:00');
INSERT INTO sales (plant_id, quantity, total_price, sold_at) VALUES (9, 1, 22.5, '2026-05-28 16:30:00');