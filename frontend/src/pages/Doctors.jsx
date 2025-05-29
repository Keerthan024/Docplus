import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [selectedSpecialities, setSelectedSpecialities] = useState([]);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const doctorsPerPage = 6; // Number of doctors per page
  const navigate = useNavigate();
  const { doctors } = useContext(AppContext);

  const getRandomRating = () => {
    return (Math.random() * 2 + 3).toFixed(1); // Random rating between 3.0 and 5.0
  };

  const applyFilter = () => {
    let filtered = doctors.map((doc) => ({
      ...doc,
      rating: getRandomRating(),
    }));

    if (selectedSpecialities.length > 0) {
      filtered = filtered.filter((doc) =>
        selectedSpecialities.includes(doc.speciality)
      );
    }

    if (onlyAvailable) {
      filtered = filtered.filter((doc) => doc.available);
    }

    setFilterDoc(filtered);
  };

  useEffect(() => {
    applyFilter();
  }, [selectedSpecialities, onlyAvailable, doctors]);

  const specialities = [
    "General physician",
    "Gynecologist",
    "Dermatologist",
    "Pediatricians",
    "Neurologist",
    "Gastroenterologist",
  ];

  // Get current doctors based on the page
  const indexOfLastDoctor = currentPage * doctorsPerPage;
  const indexOfFirstDoctor = indexOfLastDoctor - doctorsPerPage;
  const currentDoctors = filterDoc.slice(indexOfFirstDoctor, indexOfLastDoctor);

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="bg-gradient-to-r from-[#002d39] to-[#76afbe] min-h-screen w-full rounded-lg p-4 sm:p-6">
      <p className="text-white text-lg mb-4 font-semibold">
        Discover expert doctors based on speciality
      </p>

      <div className="flex flex-col sm:flex-row gap-5">
        {/* Filters */}
        <div className="flex flex-col gap-3 sm:w-[200px] text-white text-sm">
          <button
            className={`py-1 px-3 border rounded sm:hidden transition-all ${
              showFilter ? "bg-primary text-white" : ""
            }`}
            onClick={() => setShowFilter((prev) => !prev)}
          >
            Filters
          </button>

          <div className={`flex-col gap-3 ${showFilter ? "flex" : "hidden sm:flex"}`}>
            <p className="font-medium text-base">Specialities</p>
            {specialities.map((item, idx) => (
              <label key={idx} className="flex items-center gap-2 cursor-pointer hover:scale-[1.01] transition-transform">
                <input
                  type="checkbox"
                  checked={selectedSpecialities.includes(item)}
                  onChange={() =>
                    setSelectedSpecialities((prev) =>
                      prev.includes(item)
                        ? prev.filter((s) => s !== item)
                        : [...prev, item]
                    )
                  }
                />
                {item}
              </label>
            ))}

            <label className="flex items-center gap-2 mt-4">
              <input
                type="checkbox"
                checked={onlyAvailable}
                onChange={() => setOnlyAvailable((prev) => !prev)}
              />
              Show only available
            </label>
          </div>
        </div>

        {/* Doctors Grid */}
        <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-x-2 gap-y-4 place-items-center">
          {currentDoctors.map((item, index) => (
            <div
              key={index}
              onClick={() => navigate(`/appointment/${item._id}`)}
              className="max-w-[260px] w-full border border-blue-200 rounded-xl overflow-hidden cursor-pointer bg-white shadow hover:shadow-xl transform transition-all hover:-translate-y-2 hover:scale-[1.02]"
            >
              <img
                className="w-full h-42 object-cover rounded-t-xl"
                src={item.image}
                alt={item.name}
              />
              <div className="p-3 space-y-1.5">
                <div className={`flex items-center gap-2 text-sm ${item.available ? "text-green-500" : "text-red-500"}`}>
                  <span className={`w-2 h-2 rounded-full ${item.available ? "bg-green-500" : "bg-red-500"}`}></span>
                  <p>{item.available ? "Available" : "Not Available"}</p>
                </div>

                <p className="text-black text-base font-semibold">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.speciality}</p>

                <div className="flex items-center gap-1 text-yellow-400">
                  {Array.from({ length: 5 }, (_, i) => (
                    <span key={i}>
                      {i < Math.floor(item.rating) ? "★" : "☆"}
                    </span>
                  ))}
                  <span className="text-xs text-gray-500 ml-1">({item.rating})</span>
                </div>
              </div>
            </div>
          ))}

          {filterDoc.length === 0 && (
            <p className="text-white col-span-full text-center text-lg mt-10">No doctors found for the selected filters.</p>
          )}
        </div>
      </div>

      {/* Pagination */}
      {filterDoc.length > 6 && (
        <div className="flex justify-center gap-4 mt-6">
          <button
            className="py-2 px-4 text-white bg-primary rounded-md hover:bg-primary-dark"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <button
            className="py-2 px-4 text-white bg-primary rounded-md hover:bg-primary-dark"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage * doctorsPerPage >= filterDoc.length}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Doctors;
