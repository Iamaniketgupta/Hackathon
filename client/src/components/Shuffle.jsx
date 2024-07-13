import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

const ShuffleHero = () => {
  return (
    <section className="w-full px-8 py-12 grid grid-cols-1 md:grid-cols-2 items-center gap-8 max-w-6xl mx-auto">
      <div> 
        <h3 className="text-4xl text-white md:text-6xl font-semibold">
        Clean Your Place with the Help of RagPickers 🧹
        </h3>
        <p className="text-base text-white md:text-lg  my-4 md:my-6">
        A professional service to help you maintain a clean and organized living space. Let RagPickers handle the mess so you can enjoy a cleaner, happier home.
        </p>
      </div>
      <ShuffleGrid />
    </section>
  );
};

const shuffle = (array) => {
  let currentIndex = array.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex],
      array[currentIndex],
    ];
  }

  return array;
};

const squareData = [
  {
    id: 1,
    src: "https://cdn.firstcry.com/education/2022/06/22134209/157893749.jpg",
  },
  {
    id: 2,
    src: "https://static.toiimg.com/thumb/msid-68973347,width-400,resizemode-4/68973347.jpg",
  },
  {
    id: 3,
    src: "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/12/17/Pictures/gurugram-ragpickers_87810536-01de-11e9-b709-b8f5f1e83cec.jpg",
  },
  {
    id: 4,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXO7PkFBGsmLuAxT4R3RGPWiddNmGYbgho5A&s",
  },
  {
    id: 5,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoDjg5VwC00dYaVJcY6eB9Ztt2n9oN-_9Fxw&s",
  },
  {
    id: 6,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9LGpukuQYiBppYx2VI4_T7RoEw3tO7ArAeQ&s",
  },
  {
    id: 7,
    src: "https://www.freshwatercleveland.com/galleries/2023/Issue_566/littergroupphoto3.JPG",
  },
  {
    id: 8,
    src: "https://c8.alamy.com/comp/E6BCG8/detroit-michigan-volunteers-clean-up-a-distressed-neighborhood-during-E6BCG8.jpg",
  },
  {
    id: 9,
    src: "https://www.wikihow.com/images/thumb/5/53/Keep-Your-Neighborhood-Clean-Step-5.jpg/v4-460px-Keep-Your-Neighborhood-Clean-Step-5.jpg.webp",
  },
  {
    id: 10,
    src: "https://cdn.firstcry.com/education/2022/06/22134209/157893749.jpg",
  },
  {
    id: 11,
    src: "https://static.toiimg.com/thumb/msid-68973347,width-400,resizemode-4/68973347.jpg",
  },
  {
    id: 12,
    src: "https://images.hindustantimes.com/rf/image_size_960x540/HT/p2/2018/12/17/Pictures/gurugram-ragpickers_87810536-01de-11e9-b709-b8f5f1e83cec.jpg",
  },
  {
    id: 13,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRXO7PkFBGsmLuAxT4R3RGPWiddNmGYbgho5A&s",
  },
  {
    id: 14,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRoDjg5VwC00dYaVJcY6eB9Ztt2n9oN-_9Fxw&s",
  },
  {
    id: 15,
    src: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ9LGpukuQYiBppYx2VI4_T7RoEw3tO7ArAeQ&s",
  },
  {
    id: 16,
    src: "https://www.freshwatercleveland.com/galleries/2023/Issue_566/littergroupphoto3.JPG",
  },
 
];

const generateSquares = () => {
  return shuffle(squareData).map((sq) => (
    <motion.div
      key={sq.id}
      layout
      transition={{ duration: 1.5, type: "spring" }}
      className="w-full h-full"
      style={{
        backgroundImage: `url(${sq.src})`,
        backgroundSize: "cover",
      }}
    ></motion.div>
  ));
};

const ShuffleGrid = () => {
  const timeoutRef = useRef(null);
  const [squares, setSquares] = useState(generateSquares());

  useEffect(() => {
    shuffleSquares();

    return () => clearTimeout(timeoutRef.current);
  }, []);

  const shuffleSquares = () => {
    setSquares(generateSquares());
    timeoutRef.current = setTimeout(shuffleSquares, 3000);
  };

  return (
    <div className="grid grid-cols-4 grid-rows-4 h-[450px] gap-1">
      {squares.map((sq) => sq)}
    </div>
  );
};

export default ShuffleHero;