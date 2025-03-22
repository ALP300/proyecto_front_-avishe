import React, { useEffect, useState } from "react";
// import Header from "components/Header"; // Comment out for now to isolate the issue


const App = () => {
  const [data, setData] = useState([]); // Datos de la API
  const [loading, setLoading] = useState(true); // Estado de carga
  const [error, setError] = useState(null); // Estado de error

  // Datos estáticos de colmenas
  const beehives = [
    {
      id: "3213",
      temperature: "20°C",
      humidity: "10%",
      weight: "20 k",
      image: "/images/colmenas.jpg",
      imageCount: "8k",
      imageIcon: "/images/camara.png",
    },
    // ... (resto de los datos estáticos)
  ];

  // Función para obtener los datos de la API
  const fetchData = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://api.example.com/beehives");
      if (!response.ok) throw new Error("Error fetching data");
      const result = await response.json();
      setData(result);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="flex-1 p-6 lg:p-8">
        {/* <Header /> */} {/* Comment out for now */}
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        <div className="flex justify-center mt-8">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl w-full">
            {beehives.map((beehive) => (
              <div
                key={beehive.id}
                className="bg-white rounded-xl shadow-md hover:shadow-xl transition-shadow overflow-hidden w-[350px]"
              >
                <div className="p-4 flex justify-between items-center">
                  <h2 className="text-lg font-semibold text-gray-800">
                    N° - {beehive.id}
                  </h2>
                  <img
                    src="/images/dropdown-arrow.png"
                    alt="Dropdown Arrow"
                    width={20}
                    height={20}
                  />
                </div>
                <div className="relative px-4">
                  <img
                    src={beehive.image}
                    alt={`Beehive ${beehive.id}`}
                    className="w-full h-48 object-cover rounded-lg border-4 border-white"
                  />
                  <div className="absolute top-3 right-6 bg-white rounded-full p-2 shadow-md">
                    <img
                      src="/images/signal-icon.svg"
                      alt="Signal Icon"
                      width={18}
                      height={18}
                    />
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex justify-between items-center text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/temperatura.png"
                        alt="Temperature Icon"
                        width={18}
                        height={18}
                      />
                      <span>{beehive.temperature}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/humedad.png"
                        alt="Humidity Icon"
                        width={18}
                        height={18}
                      />
                      <span>{beehive.humidity}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src="/images/escala-de-peso.png"
                        alt="Weight Icon"
                        width={18}
                        height={18}
                      />
                      <span>{beehive.weight}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <img
                        src={beehive.imageIcon}
                        alt="Image Count Icon"
                        width={18}
                        height={18}
                      />
                      <span>{beehive.imageCount}</span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;