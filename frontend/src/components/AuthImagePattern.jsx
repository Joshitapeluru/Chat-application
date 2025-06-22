const AuthImagePattern = ({ title, subtitle }) => {
  const colors = [
    "bg-blue-200", // light blue
    "bg-purple-200" // light purple
  ];

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-8">
      <div className="max-w-md text-center">
        {/* Grid of tightly spaced boxes */}
      <div className="flex flex-col items-center justify-center">
  <div className="grid grid-cols-3 gap-3">
    {[...Array(9)].map((_, i) => (
      <div
        key={i}
        className="w-24 h-24 rounded-md bg-[#2b2f42] animate-pulse"
      />
    ))}
  </div>


  
</div>


        {/* Text Content */}
        <h2 className="text-2xl font-bold mb-2 text-white">{title}</h2>
        <p className="text-sm text-gray-300">{subtitle}</p>
      </div>
    </div>
  );
};

export default AuthImagePattern;
