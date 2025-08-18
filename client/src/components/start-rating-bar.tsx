interface StarRatingBarProps {
  stars: number;
  width: number;
}

const StarRatingBar = (props: StarRatingBarProps) => {
  const { stars, width } = props;

  return (
    <div className="flex items-center mb-2">
      <div className="flex items-center w-8">
        {/* Star icon and number */}
        <span className="text-yellow-400 text-lg">★</span>
        <span className="ml-1 text-gray-700">{stars}</span>
      </div>
      {/* The progress bar */}
      <div className="flex-1 bg-gray-200 h-2 rounded-full mx-2">
        <div
          className="bg-black h-full rounded-full transition-all duration-500 ease-in-out"
          style={{ width: `${width}%` }}
        />
      </div>
      {/* The small dot */}
      {/* <div className="w-1 h-1 bg-gray-500 rounded-full" /> */}
    </div>
  );
};

export default StarRatingBar;
