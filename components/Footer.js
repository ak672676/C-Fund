export default function Footer() {
  return (
    <footer className="bg-gray-100  w-full px-12">
      <div className="flex">
        <div className="flex-1 p-4">
          <h3 className="text-xl font-bold">Causes</h3>
          <ul>
            <li className="cursor-pointer">Startup Crowdfunding</li>
            <li className="cursor-pointer">Medical Crowdfunding</li>
            <li className="cursor-pointer">Education Crowdfunding</li>
            <li className="cursor-pointer">Relief Fund</li>
          </ul>
        </div>
        <div className="flex-1 p-4">
          <h3 className="text-xl font-bold">About Us</h3>
          <ul>
            <li className="cursor-pointer">C-Fund community</li>
            <li className="cursor-pointer">In The News</li>
            <li className="cursor-pointer">C-Funs Blog</li>
          </ul>
        </div>
        <div className="flex-1 p-4">
          <h3 className="text-xl font-bold">How it works?</h3>
          <ul>
            <li className="cursor-pointer">Fundraising Tips</li>
            <li className="cursor-pointer">What is Crowdfunding?</li>
            <li className="cursor-pointer">Fund Withdraw</li>
          </ul>
        </div>
      </div>
      <div className="text-center border-t-2 py-4">
        Copyright © 2022 C-Fund. All Rights Reserved. Terms of Use | Privacy
        Policy
      </div>
    </footer>
  );
}
