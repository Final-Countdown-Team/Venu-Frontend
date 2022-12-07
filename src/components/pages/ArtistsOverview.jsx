import PreviewCard from "../cards/PreviewCard";
import SearchBar from "../search/SearchBar";
import photo from "../../img/dancing.gif"

function ArtistsOverview() {
  return (
    <div>
      <SearchBar />
      <PreviewCard description="This is the description of the artist that no one cares about right now." name="Jimmy Jones" img={photo} />
      
    </div>
  );
}

export default ArtistsOverview;
