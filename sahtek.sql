-- TABLEAU DE UTILISATEUR (Tuser)
CREATE TABLE IF NOT EXISTS Tuser (
    userId         INT AUTO_INCREMENT PRIMARY KEY,
    patientId      VARCHAR(100),
    nomUser        VARCHAR(100) NOT NULL,
    prenomUser     VARCHAR(100) NOT NULL,
    emailUser      VARCHAR(100) NOT NULL,
    password       VARCHAR(255) NOT NULL, 
    hopitalId      INT,
    role           ENUM('admin', 'adminHopital', 'recepcioniste', 'docteur', 'patient', 'infermier', 'laborantin' , 'radiologue') NOT NULL,
    FOREIGN KEY (hopitalId) REFERENCES Hopital(hopitalId),
    FOREIGN KEY (patientId ) REFERENCES Patient (patientId)
    
);


-- TABLEAU DE PATIENT
CREATE TABLE IF NOT EXISTS Patient (
    patientId         VARCHAR(100) PRIMARY KEY, 
    userId            INT,
    nomPatient        VARCHAR(100) NOT NULL, 
    prenomPatient     VARCHAR(100) NOT NULL, 
    adressePatient    VARCHAR(100) NOT NULL, 
    telephonePatient  VARCHAR(15) NOT NULL, -- Adjusted for phone numbers
    mutuelle          INT,
    etatPatient       BOOLEAN NOT NULL, -- Fixed typo
    dateDeNaissancePatient DATE,
    personneAContacter VARCHAR(100),
    FOREIGN KEY (userId ) REFERENCES Tuser (userId)

);


-- TABLEAU HOPITAL
CREATE TABLE IF NOT EXISTS Hopital (
    hopitalId           INT AUTO_INCREMENT PRIMARY KEY,
    nomHopital          VARCHAR(100) NOT NULL,
    localisation        VARCHAR(100) NOT NULL
);

-- TABLEAU DPI (Dossier Patient Informatisé)
CREATE TABLE IF NOT EXISTS DPI (
    patientId  VARCHAR(100),
    QR         VARCHAR(100) NOT NULL,
    PRIMARY KEY (patientId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId)
        ON DELETE CASCADE ON UPDATE CASCADE
);

-- TABLEAU DE CONSULTATION
CREATE TABLE IF NOT EXISTS Consultation (
    patientId  VARCHAR(100),
    userId     INT,
    consultationDate DATE, -- Fixed typo
    billanBiologiqueId INT,
    billanRadiologiqueId INT,
    ordononceId INT,

    PRIMARY KEY (patientId, userId, consultationDate),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId),
    FOREIGN KEY (userId) REFERENCES Tuser(userId),
    FOREIGN KEY (billanBiologiqueId) REFERENCES BillanBiologique(billanBiologiqueId),
    FOREIGN KEY (billanRadiologiqueId) REFERENCES BillanRadiologique(billanRadiologiqueId),
    FOREIGN KEY (ordononceId) REFERENCES Ordononce(ordononceId)
);

-- TABLEAU DEMANDE
CREATE TABLE IF NOT EXISTS Demande (
    demandeId             INT PRIMARY KEY AUTO_INCREMENT,
    etatDemande           BOOLEAN NOT NULL, 
    userId                INT,
    typeDemande           ENUM('radio', 'bilan', 'certaficatMedical') NOT NULL,
    contenuDemande        VARCHAR(100) NOT NULL,
    dateDenvoi            DATE,
    FOREIGN KEY (userId) REFERENCES Tuser(userId)
);

-- TABLEAU ORDONANCE
CREATE TABLE IF NOT EXISTS Ordononce (
    ordononceId  INT PRIMARY KEY AUTO_INCREMENT
);

-- TABLEAU ORDONANCE-MEDICAMENT
CREATE TABLE IF NOT EXISTS OrdononceMedicament (
    ordononceId  INT,
    medicamentId  INT,
    dose  VARCHAR(100) NOT NULL ,
    duree  VARCHAR(100) NOT NULL , 
    
    PRIMARY KEY (ordononceId, medicamentId),
    FOREIGN KEY (ordononceId) REFERENCES Ordononce(ordononceId),
    FOREIGN KEY (medicamentId) REFERENCES Medicament(medicamentId)
);

-- TABLEAU MEDICAMENT
CREATE TABLE IF NOT EXISTS Medicament (
    medicamentId  INT PRIMARY KEY AUTO_INCREMENT,
    nomMedicament  VARCHAR(100) NOT NULL 
);

-- TABLEAU BILLAN-BIOLOGIQUE
CREATE TABLE IF NOT EXISTS BillanBiologique (
    billanBiologiqueId  INT PRIMARY KEY AUTO_INCREMENT,
    userId  INT,
    typeBilan ENUM('glycémie', 'pression','cholestérol') NOT NULL ,
    graphImage BLOB,

    FOREIGN KEY (userId) REFERENCES Tuser(userId)
);

-- Table principale BillanRadiologique
CREATE TABLE IF NOT EXISTS BillanRadiologique (
    billanRadiologiqueId INT PRIMARY KEY AUTO_INCREMENT,
    RadioType ENUM('URM', 'ecographie', 'radiographic', 'autre') NOT NULL,
    userId INT,
    compteRendu VARCHAR(500) NOT NULL,

    FOREIGN KEY (userId) REFERENCES Tuser(userId)
);

-- Table associée BillanRadiologiqueImages
CREATE TABLE IF NOT EXISTS BillanRadiologiqueImages (
    imageId INT PRIMARY KEY AUTO_INCREMENT,
    billanRadiologiqueId INT,
    imageData BLOB NOT NULL,
    description VARCHAR(255),
    FOREIGN KEY (billanRadiologiqueId) REFERENCES BillanRadiologique(billanRadiologiqueId)
);

CREATE TABLE IF NOT EXISTS SoinObservation (
    compteur        INT AUTO_INCREMENT, 
    patientId       VARCHAR(100),
    userId          INT,
    consultationDate DATE,
    descriptionSoin VARCHAR(200),
    observation     VARCHAR(200),
    
    PRIMARY KEY (compteur), -- Make compteur the primary key
    UNIQUE KEY (patientId, userId, consultationDate), -- Optional: enforce uniqueness of this combination
    
    FOREIGN KEY (userId) REFERENCES Tuser(userId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId)
);
