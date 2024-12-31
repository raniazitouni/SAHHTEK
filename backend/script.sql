
-- Reset AUTO_INCREMENT values for each table
ALTER TABLE Hopital AUTO_INCREMENT = 1;
ALTER TABLE Patient AUTO_INCREMENT = 1;
ALTER TABLE Tuser AUTO_INCREMENT = 1;
ALTER TABLE DPI AUTO_INCREMENT = 1;
ALTER TABLE Demande AUTO_INCREMENT = 1;
ALTER TABLE BilanBiologique AUTO_INCREMENT = 1;
ALTER TABLE BilanRadiologique AUTO_INCREMENT = 1;
ALTER TABLE demandeCertaficat AUTO_INCREMENT = 1;
ALTER TABLE demandeRadio AUTO_INCREMENT = 1;
ALTER TABLE demandeBilan AUTO_INCREMENT = 1;
ALTER TABLE Ordonnance AUTO_INCREMENT = 1;
ALTER TABLE Medicament AUTO_INCREMENT = 1;
ALTER TABLE OrdonnanceMedicament AUTO_INCREMENT = 1;
ALTER TABLE SoinObservation AUTO_INCREMENT = 1;
ALTER TABLE Consultation AUTO_INCREMENT = 1;



-- Insert data into Hopital table
INSERT INTO Hopital (nomHopital, localisation)
VALUES 
    ('Hopital A', 'Alger'),
    ('Hopital B', 'Oran'),
    ('Hopital C', 'Constantine');


-- Insert data into Patient table
INSERT INTO Patient (patientId, mutuelle, etatPatient, personneAContacter)
VALUES
    ('123456789', 'Mutuelle A', TRUE, 'John Doe'),
    ('987654321', 'Mutuelle B', FALSE, 'Jane Doe'),
    ('456789012', 'Mutuelle C', FALSE, 'Zitouni Rania'),
    ('321548765', 'Mutuelle D', FALSE, 'Hasnaoui Sarah'),
    ('654321098', 'Mutuelle E', TRUE, 'Robert Smith');


-- Insert data into Tuser table (assumes hospital IDs exist from Hopital table)
INSERT INTO Tuser (patientId, nomUser, prenomUser, telephone, dateDeNaissance, adresse, emailUser, password,oldPassword, hopitalId, role)
VALUES
    ('123456789', 'Ali', 'Ben Ali', '0123456789', '1990-01-01', 'Alger, 12 Rue XYZ', 'ali.benali@example.com', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==','Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 1, 'patient'),
    ('987654321', 'Amine', 'Ben Amine', '0987654321', '1985-05-15', 'Oran, 45 Rue ABC', 'amine.benamine@example.com', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==','Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 1, 'patient'),
    ('456789012', 'Samir', 'Ben Samir', '0112233445', '2000-09-23', 'Constantine, 32 Rue LMN', 'samir.bensamir@example.com', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==','Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 1, 'patient'),
    (NULL, 'Alouane', 'safa', '0112233445', '2004-09-23', 'Constantine, 32 Rue LMN', 'ms_alouane@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==','Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 1, 'docteur'),
    (NULL, 'Zitouni', 'rania', '0112233445', '2004-09-23', 'Constantine, 32 Rue LMN', 'mr_zitouni@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==','Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 1, 'laborantin'),
    (NULL, 'Hasnaoui', 'sarah', '0112233445', '2004-09-23', 'Constantine, 32 Rue LMN', 'ms_hasnaoui@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==','Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 1, 'radiologue'),
    (NULL, 'Zitouni', 'fares', '0112233445', '2004-09-23', 'Constantine, 32 Rue LMN', 'ms_hasnaoui@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==','Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 1, 'recepcioniste'),
    (NULL, 'Terkmani', 'Aya', '0112233445', '2000-09-23', 'Constantine, 32 Rue LMN', 'ma_terkmani@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==','Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 1, 'infermier'),

    ('321548765', 'Karim', 'Bouaziz', '0156781234', '1992-02-20', 'Blida, 10 Rue ABC', 'karim.bouaziz@example.com', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 2, 'patient'),
    (NULL, 'Sofia', 'Khaled', '0192345678', '1990-05-18', 'Oran, 45 Rue JKL', 'sofia.khaled@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 2, 'docteur'),
    (NULL, 'Tariq', 'Mebarki', '0189012345', '1980-11-25', 'Alger, 30 Rue MNO', 'tariq.mebarki@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 2, 'laborantin'),
    (NULL, 'Yassir', 'Ait Messaoud', '0156789012', '1994-04-10', 'Blida, 55 Rue PQR', 'yassir.aitmessaoud@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 2, 'radiologue'),
    (NULL, 'Leila', 'Boudjemaa', '0198765432', '1998-09-17', 'Oran, 18 Rue STU', 'leila.boudjemaa@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 2, 'recepcioniste'),
    (NULL, 'Ahmed', 'Benaissa', '0176543210', '1995-06-14', 'Blida, 50 Rue VWX', 'ahmed.benaissa@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 2, 'infermier'),

    ('654321098', 'Zohra', 'Guerroudj', '0145612345', '1993-08-30', 'Alger, 12 Rue YZA', 'zohra.guerroudj@example.com', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 3, 'patient'),
    (NULL, 'Rachid', 'Boudiaf', '0178901234', '1983-11-22', 'Alger, 60 Rue HIJ', 'rachid.boudiaf@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 3, 'docteur'),
    (NULL, 'Amina', 'Khelifi', '0168765432', '1992-01-30', 'Oran, 75 Rue KLM', 'amina.khelifi@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 3, 'laborantin'),
    (NULL, 'Mounir', 'Tahar', '0154345678', '1995-05-10', 'Blida, 80 Rue NOP', 'mounir.tahar@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 3, 'radiologue'),
    (NULL, 'Khaled', 'Benziane', '0145678901', '2000-09-22', 'Alger, 90 Rue QRS', 'khaled.benziane@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 3, 'recepcioniste'),
    (NULL, 'Rami', 'Saidi', '0178923456', '1997-04-15', 'Oran, 100 Rue TUV', 'rami.saidi@esi.dz', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 'Z0FBQUFBQm5jNTNVeWhBLTYzNF96NGpnWU0zWHM1SjV0RkU2bFV4ek1XQ01wTWFYNVVsaFphbmQyaUxheGJCMlVpZWJhaHlhRWlkSXJ5bWh4bmJLQWdhbVlUTzNCMWIwX2c9PQ==', 3, 'infermier');


-- Insert data into BilanBiologique table with userId = 5
INSERT INTO BilanBiologique (userId, glycemieValue, pressionValue, cholesterolValue, resultDate , etatbilan)
VALUES
    (5, 120.5, 130.0, 200.0, '2024-12-20',FALSE),
    (5, 110.0, 120.0, 190.0, '2024-12-21',TRUE),
    (5, 115.0, 125.0, 180.0, '2024-12-19',FALSE),
    (5, 125.0, 135.0, 210.0, '2024-12-18',FALSE),
    (5, 118.0, 122.0, 195.0, '2024-12-17',TRUE),
    (5, 130.0, 140.0, 205.0, '2024-12-16',TRUE),
    (5, 119.0, 127.0, 185.0, '2024-12-15',TRUE),
    (5, 112.0, 130.0, 220.0, '2024-12-14',TRUE),
    (5, 110.5, 125.0, 215.0, '2024-12-13',TRUE);

-- Insert data into BilanRadiologique table with userId = 6
INSERT INTO BilanRadiologique (RadioType, userId, compteRendu, image)
VALUES
    ('IRM', 6, 'No abnormalities detected', 'image4.jpg'),
    ('echographie', 6, 'Moderate abnormality in kidney', 'image5.jpg'),
    ('radiographic', 6, 'Fracture detected in left arm', 'image6.jpg'),
    ('IRM', 6, 'Cyst detected in brain', 'image7.jpg'),
    ('echographie', 6, 'Enlarged liver with mild inflammation', 'image8.jpg'),
    ('radiographic', 6, 'No fractures or abnormalities detected', 'image9.jpg');

-- Insert data into demandeCertaficat table with docteurId = 4
INSERT INTO demandeCertaficat (etatDemande, docteurId, patientId, contenuDemande, dateDenvoi, certificatPdf)
VALUES
    (TRUE, 4, '321548765', NULL, '2024-12-21', 'certificat3.pdf'),
    (FALSE, 4, '456789012', NULL, '2024-12-22', 'certificat4.pdf'),
    (TRUE, 4, '987654321', NULL, '2024-12-23', 'certificat5.pdf'),
    (FALSE, 4, '123456789', NULL, '2024-12-24', 'certificat6.pdf');

-- Insert data into demandeRadio table
INSERT INTO demandeRadio (etatDemande, docteurId, patientId, radiologueId, dateDenvoi, typeRadio)
VALUES
    (TRUE, 4, '123456789', 6, '2024-12-20', 'IRM'),
    (FALSE, 4, '456789012', 6, '2024-12-19', 'echographie'),
    (FALSE, 4, '123456789', 6, '2024-12-23', 'radiographie'),
    (TRUE, 4, '987654321', 6, '2024-12-21', 'IRM'),
    (TRUE, 4, '123456789', 6, '2024-12-22', 'echographie'),
    (TRUE, 4, '123456789', 6, '2024-12-24', 'radiographie');

-- Insert data into demandeBilan table
INSERT INTO demandeBilan (etatDemande, docteurId, patientId, laborantinId, dateDenvoi)
VALUES
    (TRUE, 4, '123456789', 5, '2024-12-21'),
    (FALSE, 4, '123456789', 5, '2024-12-22'),
    (TRUE, 4, '123456789', 5, '2024-12-23'),
    (TRUE, 4, '123456789', 5, '2024-12-24'),
    (FALSE, 4, '123456789', 5, '2024-12-25'),
    (TRUE, 4, '987654321', 5, '2024-12-26'),
    (FALSE, 4, '456789012', 5, '2024-12-27'),
    (TRUE, 4, '321548765', 5, '2024-12-28'),
    (TRUE, 4, '654321098', 5, '2024-12-29');
   

-- Insert data into Medicament table
INSERT INTO Medicament (nomMedicament)
VALUES
    ('Aspirin'),
    ('Ciprofloxacin'),
    ('Loratadine'),
    ('Metformin'),
    ('Omeprazole'),
    ('Simvastatin'),
    ('Amiodarone'),
    ('Furosemide'),
    ('Lisinopril'),
    ('Prednisone');

-- Insert data into Ordonnance table
INSERT INTO Ordonnance (validated)
VALUES
    (TRUE),
    (FALSE);

-- Insert data into OrdonnanceMedicament table
INSERT INTO OrdonnanceMedicament (OrdonnanceId, medicamentId, dose, duree)
VALUES
    (1, 1, '500mg', '7 days'),
    (1, 2, '500mg', '7 days'),
    (1, 3, '500mg', '7 days'),
    (1, 4, '500mg', '7 days'),
    (2, 5, '200mg', '5 days'),
    (2, 6, '200mg', '5 days'),
    (2, 7, '200mg', '5 days'),
    (2, 8, '200mg', '5 days'),
    (2, 9, '200mg', '5 days');

-- Insert data into SoinObservation table
INSERT INTO SoinObservation (patientId, userId, consultationDate, descriptionSoin, observation)
VALUES
    ('123456789', 8, '2024-12-21', 'Consultation for fever and fatigue', NULL),
    ('123456789', 8, '2024-12-22', NULL, 'Patient shows improvement but still experiences some discomfort.'),
    ('123456789', 8, '2024-12-23', 'Consultation for sore throat', NULL),
    ('987654321', 8, '2024-12-24', NULL, 'Blood pressure slightly elevated, advised for monitoring.'),
    ('987654321', 8, '2024-12-25', 'Consultation for chronic headache', NULL),
    ('987654321', 8, '2024-12-26', NULL, 'Surgical site healing well, no complications.'),
    ('456789012', 8, '2024-12-27', 'Consultation for skin rash', NULL),
    ('456789012', 8, '2024-12-28', NULL, 'Routine check-up normal, no major health issues found.'),
    ('456789012', 8, '2024-12-29', 'Consultation for stomach cramps', NULL),
    ('321548765', 8, '2024-12-30', NULL, 'RICE therapy recommended, follow-up in a week.');

-- Insert data into Consultation table 
INSERT INTO Consultation (patientId, userId, consulationDate, resumeconsultation, bilanBiologiqueId, bilanRadiologiqueId, ordonnanceId, demandeRadioId, demandeBilanId)
VALUES
    ('123456789', 4, '2024-12-21', 'Consultation for fever and chills, recommended blood test', 1, 1, 1, 1, 1),
    ('123456789', 4, '2024-12-22', 'Consultation for fever and chills, recommended blood test', 6, 6, NULL, 6, 2),
    ('123456789', 4, '2024-12-23', 'Consultation for fever and chills, recommended blood test', 7, NULL, NULL, NULL, 3),
    ('123456789', 4, '2024-12-24', 'Consultation for fever and chills, recommended blood test', 8, NULL, NULL, NULL, 4),
    ('123456789', 4, '2024-12-25', 'Consultation for fever and chills, recommended blood test', 9, NULL, NULL, NULL, 5),

    ('987654321', 4, '2024-12-22', 'Patient reports severe headache, recommended CT scan', 2, 2, 2, 2, 6),
    ('456789012', 4, '2024-12-23', 'Routine consultation, normal except for high cholesterol', 3, 3, NULL, 3, 7),
    ('321548765', 4, '2024-12-24', 'Patient has lower back pain, recommended X-ray', 4, 4, NULL, 4, 8),
    ('654321098', 4, '2024-12-25', 'Routine check-up, patient recovering from previous surgery', 5, 5, NULL, 5, 9);

-- Insert data into DPI table
INSERT INTO DPI (patientId, QR, demandeCertaficatId)
VALUES
    ('123456789', '123456789', 1),  
    ('987654321', '987654321', 2),  
    ('456789012', '456789012', 3),  
    ('321548765', '321548765', 4),  
    ('654321098', '654321098', NULL); 