INSERT INTO public.ordini (reparto,numeroordine,urgente,esitovalidazione,datetimevalidazione,datetimeprocessed,datetimeshipped,articolodescrizione,articoloprincipioattivo,articoloclasseterapeutica,articoloforma,quantitarichiesta,quantitavalidata,quantitaconsegnata) VALUES
	 ('Cardiologia',1001,true,true,'2024-05-07 10:00:00','2024-05-07 12:00:00','2024-05-08 09:00:00','Aspirina','Acido acetilsalicilico','Analgesico','Compresse',50,50,50),
	 ('Pediatria',1002,false,true,'2024-05-08 11:00:00','2024-05-08 13:00:00','2024-05-09 10:00:00','Amoxicillina','Amoxicillina','Antibiotico','Sciroppo',100,100,100),
	 ('Ortopedia',1003,true,true,'2024-05-09 09:00:00','2024-05-09 11:00:00','2024-05-10 08:00:00','Paracetamolo','Paracetamolo','Analgesico','Compresse',80,80,80),
	 ('Gastroenterologia',1004,false,false,'2024-05-10 08:30:00','2024-05-10 10:30:00',NULL,'Omeprazolo','Omeprazolo','Antiulcera','Capsule',30,30,0),
	 ('Chirurgia',1005,true,true,'2024-05-11 07:00:00','2024-05-11 09:00:00','2024-05-12 06:00:00','Morfina','Morfina','Analgesico','Soluzione iniettabile',20,20,20),
	 ('Endocrinologia',1006,true,true,'2024-05-12 09:00:00','2024-05-12 11:00:00','2024-05-13 08:00:00','Insulina','Insulina','Antidiabetico','Fiale',40,40,40),
	 ('Neurologia',1007,false,true,'2024-05-13 10:00:00','2024-05-13 12:00:00','2024-05-14 09:00:00','Levodopa','Levodopa','Antiparkinsoniano','Compresse',60,60,60),
	 ('Pneumologia',1008,true,true,'2024-05-14 11:00:00','2024-05-14 13:00:00','2024-05-15 10:00:00','Salbutamolo','Salbutamolo','Broncodilatatore','Spray',25,25,25),
	 ('Oncologia',1009,false,true,'2024-05-15 09:00:00','2024-05-15 11:00:00','2024-05-16 08:00:00','Ciclofosfamide','Ciclofosfamide','Chemioterapico','Soluzione iniettabile',35,35,35),
	 ('Dermatologia',1010,true,false,'2024-05-16 08:30:00','2024-05-16 10:30:00',NULL,'Clobetasolo','Clobetasolo','Corticosteroide','Crema',15,15,0);
INSERT INTO public.ordini (reparto,numeroordine,urgente,esitovalidazione,datetimevalidazione,datetimeprocessed,datetimeshipped,articolodescrizione,articoloprincipioattivo,articoloclasseterapeutica,articoloforma,quantitarichiesta,quantitavalidata,quantitaconsegnata) VALUES
	 ('Oculistica',1011,true,true,'2024-05-17 09:00:00','2024-05-17 11:00:00','2024-05-18 08:00:00','Latanoprost','Latanoprost','Antiglaucoma','Gocce',70,70,70),
	 ('Urologia',1012,false,true,'2024-05-18 10:00:00','2024-05-18 12:00:00','2024-05-19 09:00:00','Tamsulosina','Tamsulosina','Antagonista alfa','Compresse',90,90,90),
	 ('Geriatria',1013,true,true,'2024-05-19 11:00:00','2024-05-19 13:00:00','2024-05-20 10:00:00','Donepezil','Donepezil','Inibitore dell’acetilcolinesterasi','Compresse',45,45,45),
	 ('Ematologia',1014,false,false,'2024-05-20 08:30:00','2024-05-20 10:30:00',NULL,'Epoetina alfa','Epoetina alfa','Stimolatore eritropoietico','Soluzione iniettabile',55,55,0),
	 ('Otorinolaringoiatria',1015,true,true,'2024-05-21 07:00:00','2024-05-21 09:00:00','2024-05-22 06:00:00','Prednisone','Prednisone','Corticosteroide','Compresse',65,65,65),
	 ('Chirurgia',1016,true,true,'2024-05-23 09:00:00','2024-05-23 11:00:00','2024-05-24 08:00:00','Fentanyl','Fentanyl','Analgesico','Patch',25,25,25),
	 ('Oncologia',1017,false,true,'2024-05-24 10:00:00','2024-05-24 12:00:00','2024-05-25 09:00:00','Doxorubicina','Doxorubicina','Chemioterapico','Soluzione iniettabile',30,30,30),
	 ('Dermatologia',1018,true,false,'2024-05-25 11:00:00','2024-05-25 13:00:00',NULL,'Tacrolimus','Tacrolimus','Immunosoppressore','Pomata',15,15,0),
	 ('Gastroenterologia',1019,false,true,'2024-05-26 08:30:00','2024-05-26 10:30:00','2024-05-27 09:00:00','Pantoprazolo','Pantoprazolo','Antiulcera','Compresse',40,40,40),
	 ('Pediatria',1020,true,true,'2024-04-27 07:00:00','2024-04-27 09:00:00','2024-04-28 06:00:00','Paracetamolo','Paracetamolo','Antipiretico','Sciroppo',50,50,50);
INSERT INTO public.ordini (reparto,numeroordine,urgente,esitovalidazione,datetimevalidazione,datetimeprocessed,datetimeshipped,articolodescrizione,articoloprincipioattivo,articoloclasseterapeutica,articoloforma,quantitarichiesta,quantitavalidata,quantitaconsegnata) VALUES
	 ('Ortopedia',1002,false,true,'2024-05-08 11:00:00','2024-05-08 13:00:00','2024-05-09 10:00:00','Paracetamolo','Paracetamolo','Analgesico','Compresse',75,60,60);
