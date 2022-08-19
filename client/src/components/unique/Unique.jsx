import "./unique.scss";

const Unique = () => {
  return (
    <div className="unique">
      <h2>
        What make us <span>Unique?</span>{" "}
      </h2>
      <div className="firstRow">
        <p>
          With this initiative, we operate our business on four more business
          models i.e Golden Real-Estate, Golden-store, Golden-Media and Golden
          Comfort Token.
        </p>
      </div>
      <div className="secondRow">
        <div className="left">
          <h2>GOLDEN REAL-ESTATE</h2>
          <p>
            This is an online agency that permits her community and the general
            public to acquire properties and rent an apartment. It also connects
            buyers and sellers of properties together across the globe.{" "}
          </p>
        </div>
        <div className="right">
          <h2>GOLDEN-STORE</h2>
          <p>
            This is an online/physical store that connects her community and the
            general public to a market place. An online market place whereby all
            products/human needs can be purchased without stress.
          </p>
        </div>
      </div>
      <div className="thirdRow">
        <div className="left">
          <h2>GOLDEN MEDIA</h2>
          <p>
            This is the media of Golden Comfort where entertainment, education,
            better future and a lot more will be embraced.
          </p>
        </div>
        <div className="right">
          <h2>GOLDEN COMFORT TOKEN (GOCT)</h2>
          <p>
            This is a decentralized blockchain token for a larger ecosystem
            called Golden Comfort Technologies that aims to tokenize and bring
            blockchain into mainstream and create greater opportunities for
            Real-estate industry, E-commerce industry, small businesses and
            eventually for everyone on earth and beyond.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Unique;
