CREATE TABLE ArticoloGiacenzeStockout (
    Reparto VARCHAR(50),
    ArticoloDescrizione VARCHAR(100),
    ArticoloPrincipioAttivo VARCHAR(100),
    ArticoloClasseTerapeutica VARCHAR(100),
    ArticoloForma VARCHAR(50),
    GiacenzeLotto VARCHAR(20),
    GiacenzeScadenza DATE,
    GiacenzeQuantita INT,
    StockoutScorta BOOLEAN,
    Timestamp DATE
);

CREATE TABLE Recall (
    IdRecall INT,
    Lotto VARCHAR(20),
    DataRecall DATE,
    ArticoloDescrizione VARCHAR(100),
    ArticoloPrincipioAttivo VARCHAR(100),
    ArticoloClasseTerapeutica VARCHAR(100),
    ArticoloForma VARCHAR(50),
    GiacenzeLotto VARCHAR(20),
    Timestamp DATE,
    PRIMARY KEY (IdRecall, Lotto)
);

CREATE TABLE Ordini (
    Reparto VARCHAR(50),
    NumeroOrdine INT,
    Urgente BOOLEAN,
    EsitoValidazione BOOLEAN,
    DatetimeValidazione TIMESTAMP,
    DatetimeProcessed TIMESTAMP,
    DatetimeShipped TIMESTAMP,
    ArticoloDescrizione VARCHAR(100),
    ArticoloPrincipioAttivo VARCHAR(100),
    ArticoloClasseTerapeutica VARCHAR(100),
    ArticoloForma VARCHAR(50),
    QuantitaRichiesta INT,
    QuantitaValidata INT,
    QuantitaConsegnata INT
);
