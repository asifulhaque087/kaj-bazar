export const shuffleArray = <T>(array: T[]): T[] => {
  // Create a shallow copy to avoid modifying the original array if desired.
  // If you want to modify the original array, remove the line below.
  const shuffledArray: T[] = [...array];

  let currentIndex: number = shuffledArray.length;
  let randomIndex: number;

  // While there remain elements to shuffle.
  while (currentIndex !== 0) {
    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [shuffledArray[currentIndex], shuffledArray[randomIndex]] = [
      shuffledArray[randomIndex],
      shuffledArray[currentIndex],
    ];
  }

  return shuffledArray;
};
