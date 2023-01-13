export const genreOptions = [
  { value: "Alternative", label: "Alternative" },
  { value: "Classic", label: "Classic" },
  { value: "Country", label: "Country" },
  { value: "Electronic", label: "Electronic" },
  { value: "Experimental", label: "Experimental" },
  { value: "Folk", label: "Folk" },
  { value: "Hip-Hop", label: "Hip-Hop" },
  { value: "Jazz", label: "Jazz" },
  { value: "Metal", label: "Metal" },
  { value: "Rock", label: "Rock" },
  { value: "Schlager", label: "Schlager" },
  { value: "Singer-Songwriter", label: "Singer-Songwriter" },
];

export const sortOptionsCore = [
  { value: "name", label: "Name: A-Z" },
  { value: "-name", label: "Name: Z-A" },
  { value: "-createdAt", label: "Newest" },
];

export const sortOptionsArtists = sortOptionsCore.concat([
  { value: "members", label: "Members asc." },
  { value: "-members", label: "Members desc." },
]);

export const sortOptionsVenues = sortOptionsCore.concat([
  { value: "capacity", label: "Capacity asc." },
  { value: "-capacity", label: "Capacity desc." },
]);

export const radiusOptions = [
  { value: "5", label: "5km" },
  { value: "10", label: "10km" },
  { value: "20", label: "20km" },
  { value: "50", label: "50km" },
  { value: "100", label: "100km" },
  { value: "200", label: "200km" },
  { value: "500", label: "500km" },
];

export const dateOptions = [
  { value: 7, label: "In 1 week" },
  { value: 14, label: "In 2 weeks" },
  { value: 31, label: "In 1 month" },
  { value: 91, label: "In 4 months" },
  { value: 182.5, label: "In 6 months" },
  { value: 365, label: "In 1 year" },
];
