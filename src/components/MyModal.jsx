const MyModal = ({ overview }) => {
  return (
    <div className=" bg-red-200 w-full h-full">
      <div
        className={` absolute w-auto opacity-90 transition-all mt-${screenY} ml-${screenX} rounded-md bg-gray-900 bg-opacity-90 text-white `}
      >
        <div className=" p-4">
          <p className=" text-xs">{overview}</p>
        </div>
      </div>
    </div>
  );
};

export default MyModal;
