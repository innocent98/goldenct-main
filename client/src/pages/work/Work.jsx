import Footer from "../../components/footer/Footer";
import GetStarted from "../../components/getStarted/GetStarted";
import "./work.scss";

const Work = () => {
  return (
    <div className="work">
      <div className="wrapper">
        <div className="first">
          <h1>HOW IT WORKS</h1>
          <p>Golden Passive Income</p>
        </div>
        <div className="second">
          <p>
            Golden Passive Income is one of the Business Models of Golden
            Comfort Technologies Ltd. <br /> This innovation is a community
            based project, a two in one daily earning platform and a financial
            freedom Artificial Intelligence (AI) that operates on:
            <br />{" "}
            <strong>
              1. Daily Passive Income Mining System (DPIMs1) and{" "}
            </strong>{" "} <br />
            <strong>
              2. Daily Passive Income Micro-Tasks System (DIPMs2).
            </strong>{" "}
            <br /><br />
            <strong>
              1.0 Daily Passive Income Mining System (DPIMs1)
            </strong>{" "}
            <br /> This <b>(DPIMs1)</b> is a onetime payment system whereby all
            members we be able to mine our native currency (Golden Comfort
            Token). When a user/member register and activate his/her account for
            GOCT mining, the system will automatically save 20% of his/her daily
            income for his/her children and unborn children for five years, and
            the remaining 80% will accumulate for one year before it can be
            withdrawn into your local bank account or our native currency,
            depending on individual choice. When a user withdraw via our token
            i.e. <b>Golden Comfort Token (GOCT)</b>, user can convert the token
            into any currency of their choice (BUSD, USDT, BNB, BITCOIN etc), It
            can also be used to shop on any of our ecosystem via Golden-store,
            Golden real-estate etc. After your withdrawal of one year mining,
            your daily earning/income continues and you will be able to withdraw
            every six months for life.
            <br />
            <br />
            <strong>
              2.0 Daily Passive Income Micro-Tasks System (DPIMs 2).
            </strong>{" "}
            <b> Daily Income Micro-Tasks System (DIMs2)</b>, a section where
            user/member can do micro jobs on the system and earn money daily.
            Micro jobs like social media boost and professional jobs.{" "}
            <b>
              {" "}
              You can hire workers to carryout survey on your blog, website, app
              etc you can also boost your social media handle
            </b>
            . This money can be withdrawn into your local bank account at your
            convenient time. The minimum withdrawal is $1 (#500).
          </p>
        </div>
      </div>
      <div>
        <GetStarted />
        <Footer />
      </div>
    </div>
  );
};

export default Work;
