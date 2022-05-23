import react from "react";
import Layout from "../components/Layout";

class About extends react.Component {
  render() {
    return (
      <Layout>
        <div className="w-full min-h-screen ">
          <section className="container mx-auto px-6 p-10">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              About
            </h2>
            <div className="flex items-center flex-wrap mb-20">
              <div className="w-full md:w-1/2 pr-10">
                <h4 className="text-3xl text-gray-800 font-bold mb-3">
                  What is crowdfunding and how does it work?
                </h4>
                <p className="text-gray-600 mb-8">
                  Crowdfunding is the use of small amounts of capital from a
                  large number of individuals to finance a new business venture.
                  Depending on the type of crowdfunding, investors either donate
                  money altruistically or get rewards such as equity in the
                  company that raised the money.
                </p>
              </div>
              <div className="w-full md:w-1/2 hover:scale-105 transform transition duration-300 ease-in-out shadow-2xl shadow-indigo-200">
                <img
                  className="rounded-lg"
                  src="https://images.pexels.com/photos/3943727/pexels-photo-3943727.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="Vortex"
                />
              </div>
            </div>
            <div className="flex items-center flex-wrap mb-20">
              <div className="w-full md:w-1/2">
                <img
                  className="rounded-lg hover:scale-105 transform transition duration-300 ease-in-out shadow-2xl shadow-indigo-200"
                  src="https://images.pexels.com/photos/8185629/pexels-photo-8185629.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                  alt="use the force"
                />
              </div>
              <div className="w-full md:w-1/2 pl-10">
                <h4 className="text-3xl text-gray-800 font-bold mb-3">
                  What is C-Fund ?
                </h4>
                <p className="text-gray-600 mb-8">
                  C-Fund is a blockchain based crowd-funding platform, which
                  lets you collect fund and contribute to different funds. It
                  not only just gives you to contribute in any fund but also,
                  enables you to approve each expenditure request.
                </p>
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default About;
