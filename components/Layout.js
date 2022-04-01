// import props from 'prop-types';
import Footer from "./Footer";
import Header from "./Header";
export default function Layout(props) {
  return (
    <div className="w-full">
      <Header />
      {props.children}
      <Footer />
    </div>
  );
}
