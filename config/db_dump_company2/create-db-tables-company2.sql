CREATE TABLE Ordini_Supply_Chain (
    Data DATE,
    Distributore VARCHAR(50),
    Prodotto VARCHAR(50),
    Categoria_Prodotto VARCHAR(50),
    Ordini_Effettuati INT,
    Ordini_Evasi INT,
    Ordini_Inevasi INT,
    Tasso_Esaurimento_Scorte NUMERIC(5, 2),
    Livello_Servizio NUMERIC(5, 2),
    Livello_Inventario INT
);

CREATE TABLE Ordini_Ecommerce (
    ID_Ordine INT PRIMARY KEY,
    Data DATE,
    Email_Cliente VARCHAR(255),
    Paese VARCHAR(50),
    Categoria_Prodotto VARCHAR(50),
    Nome_Prodotto VARCHAR(100),
    Prezzo_Unitario DECIMAL(10,2),
    Quantita INT,
    Valore_Ordine DECIMAL(10,2),
    Metodo_Pagamento VARCHAR(50)
);

CREATE TABLE Supplier_Performance_Delivery (
    Data DATE,
    Numero_Ordine VARCHAR(50),
    Linea_Prodotto VARCHAR(50),
    Codice_Articolo VARCHAR(50),
    Descrizione_Articolo VARCHAR(255),
    Prezzo_Euro DECIMAL(10, 2),
    Fornitore VARCHAR(50),
    Quantita_Fabbisogno INT,
    Quantita_Totale INT,
    Valore_Totale_Euro DECIMAL(15, 2),
    Quantita_Ricevuta INT,
    Priorita INT
);


