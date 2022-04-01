import Head from "next/head";
import Image from "next/image";
import Layout from "../components/Layout";
import fundImage from "../assets/fund.png";
import landingImage from "../assets/landing.jpg";

import React, { Component } from "react";
import { Link } from "../routes";
class Home extends Component {
  render() {
    return (
      <Layout>
        <div className="w-full  h-screen">
          <div className="h-full w-full relative">
            {/* <div className="h-full w-full absolute top-0 left-0 bg-pink-900">
              <Image
                src={landingImage}
                alt="me"
                layout="fill"
                objectFit="cover"
              />
            </div> */}
            <div className="h-full w-full flex flex-row items-center justify-center absolute top-0 left-0 ">
              <div className="flex-1 ">
                <div className="py-20 hero">
                  <div className="container mx-auto px-6">
                    <div className="text-4xl font-bold mb-2 text-indigo-600">
                      Need Funds to Pay For a Medical Emergency or Social Cause?
                    </div>
                    <div className="text-2xl mb-8 text-indigo-400">
                      C-Fund helps you collect fund in from of crypto-currency
                    </div>
                    <Link route="/pools/new">
                      <a>
                        <button className="transform hover:scale-110 transition duration-300 ease-in-out bg-white font-bold rounded-full py-6 px-8 shadow-lg uppercase tracking-wider">
                          start a fundraiser
                        </button>
                      </a>
                    </Link>
                    
                  </div>
                </div>
              </div>
              <div className="flex-1 ">
                <Image src={fundImage} alt="me" />
              </div>
            </div>
          </div>
        </div>
      </Layout>
    );
  }
}

export default Home;
