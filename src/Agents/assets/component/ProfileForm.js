export default function ProfileForm() {
    return (
      <div className="flex-1 p-6 bg-white">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold">Personal Information</h2>
          <button className="text-blue-600 font-medium">Edit</button>
        </div>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <input disabled value="Monish" className="border p-2 rounded bg-gray-100" />
        </div>
        <div className="mb-6">
          <p className="mb-1">Your Gender</p>
          <label className="mr-4"><input type="radio" name="gender"  /> Male</label>
          <label><input type="radio" name="gender" readOnly /> Female</label>
        </div>
  
        <div className="mb-6">
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-medium">Email Address</h2>
            <button className="text-blue-600 font-medium">Edit</button>
          </div>
          <input disabled value="monishkumarapj@gmail.com" className="border p-2 rounded bg-gray-100 w-full" />
        </div>
  
        <div>
          <div className="flex justify-between items-center mb-1">
            <h2 className="font-medium">Mobile Number</h2>
            <button className="text-blue-600 font-medium">Edit</button>
          </div>
          <input disabled placeholder="Enter Mobile Number" className="border p-2 rounded bg-gray-100 w-full" />
        </div>
      </div>
    );
  }
  