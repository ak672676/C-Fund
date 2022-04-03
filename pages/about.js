import react from "react";
import Layout from "../components/Layout";

class About extends react.Component {
  render() {
    return (
      <Layout>
        <div className="w-full min-h-screen bg-slate-200">
          <section className="container mx-auto px-6 p-10">
            <h2 className="text-4xl font-bold text-center text-gray-800 mb-8">
              About
            </h2>
            <div className="flex items-center flex-wrap mb-20">
              <div className="w-full md:w-1/2 pr-10">
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
              <div className="w-full md:w-1/2 hover:scale-105 transform transition duration-300 ease-in-out shadow-2xl shadow-indigo-200">
                <img
                  className="rounded-lg"
                  src="https://images.unsplash.com/photo-1639152201720-5e536d254d81?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1032&q=80"
                  alt="Vortex"
                />
              </div>
            </div>
            <div className="flex items-center flex-wrap mb-20">
              <div className="w-full md:w-1/2">
                <img
                  className="rounded-lg hover:scale-105 transform transition duration-300 ease-in-out shadow-2xl shadow-indigo-200"
                  src="https://www.thesun.co.uk/wp-content/uploads/2019/06/SWJFO-EAPlay-08-1.jpg"
                  alt="use the force"
                />
              </div>
              <div className="w-full md:w-1/2 pl-10">
                <h4 className="text-3xl text-gray-800 font-bold mb-3">
                  Use the Force!
                </h4>
                <p className="text-gray-600 mb-8">
                  We'll never get it out now. So certain are you. Always with
                  you it cannot be done. Hear you nothing that I say? Master,
                  moving stones around is one thing. This is totally different.
                  No! No different!
                </p>
              </div>
            </div>
            <div className="flex items-center flex-wrap mb-20">
              <div className="w-full md:w-1/2 pr-10">
                <h4 className="text-3xl text-gray-800 font-bold mb-3">
                  Life creates it
                </h4>
                <p className="text-gray-600 mb-8">
                  There is no try. I can't. It's too big. Size matters not. Look
                  at me. Judge me by my size, do you? Hm? Mmmm. And well you
                  should not. For my ally in the Force. And a powerful ally it
                  is.
                </p>
              </div>
              <div className="w-full md:w-1/2">
                <img
                  className="rounded-lg hover:scale-105 transform transition duration-300 ease-in-out shadow-2xl shadow-indigo-200"
                  src="https://thumbor.forbes.com/thumbor/960x0/https%3A%2F%2Fblogs-images.forbes.com%2Ferikkain%2Ffiles%2F2018%2F01%2FRey-Luke.jpg"
                  alt="Syncing"
                />
              </div>
            </div>
          </section>
        </div>
      </Layout>
    );
  }
}

export default About;
