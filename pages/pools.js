import react from "react";
import Layout from "../components/Layout";
import Pool from "../ethereum/pool";
import factory from "../ethereum/factory";
class Pools extends react.Component {
  static async getInitialProps() {
    const poolsSummary = [];
    const pools = await factory.methods.getdeployedPools().call();
    console.log(pools.length);
    for (let i = 0; i < pools.length; i++) {
      const pool = Pool(pools[i]);
      const summary = await pool.methods.getSummary().call();
      poolsSummary.push({
        minimumContribution: summary[0],
        poolBalance: summary[1],
        requests: summary[2],
        title: summary[3],
        description: summary[4],
        approversCount: summary[5],
        owner: summary[6],
      });
    }
    console.log(poolsSummary);
    return { poolsSummary };
  }

  render() {
    return (
      <Layout>
        <div className="w-screen h-screen p-4 bg-slate-50 flex flex-wrap justify-center items-center">
          {this.props.poolsSummary.map((element, index) => {
            return (
              <div
                className="h-[25%] w-[25%]  m-2 shadow-xl p-4 shadow-indigo-200 rounded-2xl hover:scale-[103%]"
                key={index}
              >
                <p className="text-xl mb-1">{element.title}</p>
                <p className="text-sm text-slate-600">Pool Owner</p>
                <p className="text-xs mb-1">{element.owner}</p>
                <p className="text-sm text-slate-600">
                  Minimum Contribution (Wei)
                </p>
                <p className="text-xs mb-1">
                  {element.minimumContribution + " Wei"}
                </p>
              </div>
            );
          })}
        </div>
      </Layout>
    );
  }
}

export default Pools;
