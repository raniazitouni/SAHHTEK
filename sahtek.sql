-- -- Supprime toutes les tables si elles existent déjà
-- SET FOREIGN_KEY_CHECKS = 0;
-- DROP TABLE IF EXISTS SoinObservation;
-- DROP TABLE IF EXISTS billanradiologiqueimages;
-- DROP TABLE IF EXISTS BilanRadiologique;
-- DROP TABLE IF EXISTS BilanBiologique;
-- DROP TABLE IF EXISTS OrdononceMedicament;
-- DROP TABLE IF EXISTS Medicament;
-- DROP TABLE IF EXISTS Ordononce;
-- DROP TABLE IF EXISTS demandeBilan;
-- DROP TABLE IF EXISTS demandeRadio;
-- DROP TABLE IF EXISTS demandeCertaficat;
-- DROP TABLE IF EXISTS Consultation;
-- DROP TABLE IF EXISTS demande;
-- DROP TABLE IF EXISTS dpi;
-- DROP TABLE IF EXISTS tuser;
-- DROP TABLE IF EXISTS patient;
-- DROP TABLE IF EXISTS hopital;
-- SET FOREIGN_KEY_CHECKS = 1;



-- TABLEAU HOPITAL
CREATE TABLE IF NOT EXISTS Hopital (
    hopitalId           INT AUTO_INCREMENT PRIMARY KEY,
    nomHopital          VARCHAR(100) NOT NULL,
    localisation        VARCHAR(100) NOT NULL
);

-- TABLEAU DE PATIENT
CREATE TABLE IF NOT EXISTS Patient (
    patientId         VARCHAR(100) PRIMARY KEY, 
    mutuelle          VARCHAR(100),
    etatPatient       BOOLEAN , 
    personneAContacter VARCHAR(100)
);

-- TABLEAU DE UTILISATEUR (Tuser)
CREATE TABLE IF NOT EXISTS Tuser (
    userId         INT AUTO_INCREMENT PRIMARY KEY,
    patientId      VARCHAR(100),
    nomUser        VARCHAR(100) NOT NULL,
    prenomUser     VARCHAR(100) NOT NULL,
    telephone      VARCHAR(100) NOT NULL,
    dateDeNaissance DATE NOT NULL,
    adresse        VARCHAR(100) NOT NULL,
    emailUser      VARCHAR(100) NOT NULL,
    password       VARCHAR(255) NOT NULL, 
    hopitalId      INT,
    role           ENUM('admin', 'adminHopital', 'recepcioniste', 'docteur', 'patient', 'infermier', 'laborantin', 'radiologue') NOT NULL,
    FOREIGN KEY (hopitalId) REFERENCES Hopital(hopitalId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId)
);

-- TABLEAU DPI (Dossier Patient Informatisé)
CREATE TABLE IF NOT EXISTS DPI (
    patientId  VARCHAR(100),
    QR         VARCHAR(100) NOT NULL,
    PRIMARY KEY (patientId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId)
        ON DELETE CASCADE ON UPDATE CASCADE
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

-- TABLEAU BILLAN-BIOLOGIQUE
CREATE TABLE IF NOT EXISTS BilanBiologique (
    bilanBiologiqueId  INT PRIMARY KEY AUTO_INCREMENT,
    userId             INT,
    -- typeBilan          ENUM('glycemie', 'pression','cholesterol') NULL,
    glycemieValue      FLOAT DEFAULT NULL, 
    pressionValue      FLOAT DEFAULT NULL,
    cholesterolValue   FLOAT DEFAULT NULL,
    resultDate         DATE DEFAULT NULL,
    FOREIGN KEY (userId) REFERENCES Tuser(userId)
);

-- TABLEAU BilanRadiologique
CREATE TABLE IF NOT EXISTS BilanRadiologique (
    bilanRadiologiqueId INT PRIMARY KEY AUTO_INCREMENT,
    RadioType           ENUM('IRM', 'ecographie', 'radiographic', 'autre') NOT NULL,
    userId              INT,
    compteRendu         VARCHAR(500) NOT NULL,
    image               VARCHAR(500),
    FOREIGN KEY (userId) REFERENCES Tuser(userId)
);

-- TABLEAU demandeCertaficat
CREATE TABLE IF NOT EXISTS demandeCertaficat (
    demandeCertaficatId    INT PRIMARY KEY AUTO_INCREMENT,
    etatDemande            BOOLEAN NOT NULL, 
    docteurId              INT,
    patientId              VARCHAR(100),
    contenuDemande         VARCHAR(100) NOT NULL,
    dateDenvoi             DATE,
    FOREIGN KEY (docteurId) REFERENCES Tuser(userId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId)
);

-- TABLEAU demandeRadio
CREATE TABLE IF NOT EXISTS demandeRadio (
    demandeRadioId         INT PRIMARY KEY AUTO_INCREMENT,
    etatDemande            BOOLEAN NOT NULL, 
    docteurId              INT,
    patientId              VARCHAR(100),
    radiologueId           INT, 
    typeRadio              ENUM('IRM', 'echographie', 'radiographic', 'autre') NOT NULL,
    FOREIGN KEY (docteurId) REFERENCES Tuser(userId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId),
    FOREIGN KEY (radiologueId) REFERENCES Tuser(userId)
);

-- TABLEAU demandeBilan
CREATE TABLE IF NOT EXISTS demandeBilan (
    demandeBilanId         INT PRIMARY KEY AUTO_INCREMENT,
    etatDemande            BOOLEAN NOT NULL, 
    docteurId              INT,
    patientId              VARCHAR(100),
    laborantinId           INT, 
    -- typeBilan              ENUM('glycemie', 'pression','cholesterol') NULL,
    FOREIGN KEY (docteurId) REFERENCES Tuser(userId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId),
    FOREIGN KEY (laborantinId) REFERENCES Tuser(userId)
);

-- TABLEAU ORDONANCE
CREATE TABLE IF NOT EXISTS Ordonnance (
    ordonnanceId  INT PRIMARY KEY AUTO_INCREMENT
);

-- TABLEAU MEDICAMENT
CREATE TABLE IF NOT EXISTS Medicament (
    medicamentId  INT PRIMARY KEY AUTO_INCREMENT,
    nomMedicament VARCHAR(100) NOT NULL
);

-- TABLEAU ORDONANCE-MEDICAMENT
CREATE TABLE IF NOT EXISTS OrdonnanceMedicament (
    OrdonnanceId  INT,
    medicamentId  INT,
    dose          VARCHAR(100) NOT NULL,
    duree         VARCHAR(100) NOT NULL, 
    PRIMARY KEY (OrdonnanceId, medicamentId),
    FOREIGN KEY (OrdonnanceId) REFERENCES Ordonnance(ordonnanceId),
    FOREIGN KEY (medicamentId) REFERENCES Medicament(medicamentId)
);





-- TABLEAU SoinObservation
CREATE TABLE IF NOT EXISTS SoinObservation (
    compteur        INT AUTO_INCREMENT, 
    patientId       VARCHAR(100),
    userId          INT,
    consultationDate DATE,
    descriptionSoin VARCHAR(200),
    observation     VARCHAR(200),
    PRIMARY KEY (compteur),
    UNIQUE KEY (patientId, userId, consultationDate),
    FOREIGN KEY (userId) REFERENCES Tuser(userId),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId)
);

-- TABLEAU DE CONSULTATION (Table d'association)
CREATE TABLE IF NOT EXISTS Consultation (
    patientId           VARCHAR(100),
    userId              INT,
    consulationDate     DATE NOT NULL,
    resumeconsultation  VARCHAR(1000) NOT NULL,
    bilanBiologiqueId   INT UNIQUE,
    bilanRadiologiqueId INT UNIQUE,
    ordonnanceId        INT,
    demandeRadioId      INT UNIQUE,
    demandeBilanId      INT UNIQUE,
    PRIMARY KEY (patientId, userId, consulationDate),
    FOREIGN KEY (patientId) REFERENCES Patient(patientId),
    FOREIGN KEY (userId) REFERENCES Tuser(userId),
    FOREIGN KEY (bilanBiologiqueId) REFERENCES BilanBiologique(bilanBiologiqueId),
    FOREIGN KEY (bilanRadiologiqueId) REFERENCES BilanRadiologique(bilanRadiologiqueId),
    FOREIGN KEY (ordonnanceId) REFERENCES Ordonnance(ordonnanceId),
    FOREIGN KEY (demandeBilanId) REFERENCES DemandeBilan(demandeBilanId),
    FOREIGN KEY (demandeRadioId) REFERENCES demandeRadio(demandeRadioId)
);


