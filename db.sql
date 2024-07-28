create database company_db;
use company_db;

CREATE TABLE user (
    id INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(50) NOT NULL,
    lastname VARCHAR(50) NOT NULL,
    username VARCHAR(50) UNIQUE NOT NULL,
     email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

CREATE TABLE userDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    address VARCHAR(255) NOT NULL,
    dateOfBirth DATE NOT NULL,
    country VARCHAR(100) NOT NULL default 'MZ',
    postalCode VARCHAR(20) ,
    phone VARCHAR(20) NOT NULL,
    alternativeEmail VARCHAR(255),
    documentId VARCHAR(100) NOT NULL,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    userId INT,
    FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE businessDetails (
    id INT AUTO_INCREMENT PRIMARY KEY,
    businessName VARCHAR(255) NOT NULL,
    legalDocument VARCHAR(100),
    email VARCHAR(255) ,
    address VARCHAR(255),
    website VARCHAR(255),
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    userId INT,
    FOREIGN KEY (userId) REFERENCES user(id)
);
CREATE TABLE app (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    clientId VARCHAR(255) NOT NULL,
    clientSecret VARCHAR(255) NOT NULL,
    name VARCHAR(100) DEFAULT NULL,
    type ENUM('t', 'production') NOT NULL,
    status ENUM('Active', 'Inactive') DEFAULT 'Active',
    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY userId (userId),
     FOREIGN KEY (userId) REFERENCES user(id)
);

CREATE TABLE wallet (
    id INT AUTO_INCREMENT PRIMARY KEY,
    balance DECIMAL(10, 2) NOT NULL default 0,
    creationDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    userId INT,
    appId INT,
    FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (appId) REFERENCES app(id)
);

CREATE TABLE button (
    id INT NOT NULL AUTO_INCREMENT,
    destination VARCHAR(255) NOT NULL,
    buttonToken VARCHAR(255) NOT NULL,
    userId INT DEFAULT NULL,
    appId INT,
    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
     updateDate TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    status TINYINT(1) DEFAULT '1',
     FOREIGN KEY (appId) REFERENCES app(id)
    ,
    PRIMARY KEY (id),
    KEY fk_user (userId),
    FOREIGN KEY (userId) REFERENCES user(id)
) ;



CREATE TABLE transaction (
    id INT NOT NULL AUTO_INCREMENT,
    walletId INT NOT NULL,
    appId INT NOT NULL,
    type ENUM('withdraw', 'deposit', 'refund') NOT NULL,
    originAccount VARCHAR(255) DEFAULT NULL,
    destinationAccount VARCHAR(255) DEFAULT NULL,
    value DECIMAL(10, 2) NOT NULL,
    date TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    userId INT DEFAULT 28,
    PRIMARY KEY (id),
    KEY walletId (walletId),
    KEY appId (appId),
     FOREIGN KEY (walletId) REFERENCES wallet(id),
     FOREIGN KEY (userId) REFERENCES user(id),
    FOREIGN KEY (appId) REFERENCES app(id)
);

CREATE TABLE orders (
    id INT NOT NULL AUTO_INCREMENT,
    products int,
    description VARCHAR(255) DEFAULT NULL,
    customerName VARCHAR(100) DEFAULT NULL,
    customerEmail VARCHAR(100) DEFAULT NULL,
    paymentMethod VARCHAR(50) DEFAULT NULL,
    orderStatus ENUM('Pending', 'Completed', 'Cancelled','refunded') DEFAULT 'Pending',
    totalAmount DECIMAL(10, 2) NOT NULL,
    currency VARCHAR(3) NOT NULL DEFAULT 'MZN',
    exchangeRate DECIMAL(10, 4) DEFAULT NULL,
     buttonToken VARCHAR(50) DEFAULT NULL,
    userId INT DEFAULT 28,
    walletId INT DEFAULT NULL,
    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    updatedAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    PRIMARY KEY (id),
    KEY walletId (walletId),
     FOREIGN KEY (walletId) REFERENCES app(id)
) ;

CREATE TABLE product (
    id INT NOT NULL AUTO_INCREMENT,
    name VARCHAR(255) NOT NULL,
    originProductId INT DEFAULT NULL,
    price DECIMAL(10, 2) NOT NULL,
    quantityOrdered INT NOT NULL,
    orderId INT,
    PRIMARY KEY (id),
    KEY orderId (orderId),
    FOREIGN KEY (orderId) REFERENCES orders(id)
);

CREATE TABLE notification (
    id INT NOT NULL AUTO_INCREMENT,
    userId INT NOT NULL,
    message TEXT NOT NULL,
    createdAt TIMESTAMP NULL DEFAULT CURRENT_TIMESTAMP,
    isRead TINYINT(1) DEFAULT '0',
    PRIMARY KEY (id),
    KEY userId (userId),
    FOREIGN KEY (userId) REFERENCES user(id) ON DELETE CASCADE
) ;







