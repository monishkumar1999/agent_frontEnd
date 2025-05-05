export default function Sidebar() {
    return (
      <div className="w-64 bg-gray-100 p-4">
        <div className="mb-6">
          <p className="text-sm text-gray-600">Hello,</p>
          <h2 className="text-xl font-semibold">Monish Kumar</h2>
        </div>
        <div>
          <h3 className="text-sm font-bold text-gray-500">MY ORDERS</h3>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-bold text-gray-500">ACCOUNT SETTINGS</h3>
          <ul className="space-y-2 mt-2">
            <li className="text-blue-600 font-semibold">Profile Information</li>
            <li>Manage Addresses</li>
            <li>PAN Card Information</li>
          </ul>
        </div>
        <div className="mt-6">
          <h3 className="text-sm font-bold text-gray-500">PAYMENTS</h3>
          <ul className="mt-2">
            <li>Gift Cards <span className="text-green-600 font-bold">₹0</span></li>
          </ul>
        </div>
      </div>
    );
  }
  