const page = () => {
  return (
    <div className="flex justify-center mt-40">
     
      <div
        className="w-200 bg-[#C0C0C0] p-0.5
        border-t-2 border-l-2 border-white
        border-b-2 border-r-2 border-b-[#404040] border-r-[#404040]"
      >
        <div className="border border-[#808080] bg-[#C0C0C0]">
          <div className="h-6 bg-[#000080] text-white flex items-center px-2 font-bold text-sm">
            Key Rush
          </div>
          <div className="p-2">
            <div className="text-sm mb-2 px-1">
              Tes2
            </div>          
            <div
              className="p-0.5 bg-[#C0C0C0]
              border-t-2 border-l-2 border-l-[#404040] border-t-[#404040]
              border-b-2 border-r-2 border-white"
            >
              <div className="bg-[#BDBDBD] h-70" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
