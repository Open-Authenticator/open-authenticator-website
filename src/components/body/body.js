import "bulma/css/bulma.css";
import "./logo.css";
import "./form_holder.css";
import { imageURL } from "../../functions/urls";

function Body() {
  return (
    <div className="block">
      <div className="block">
        <div className="block is-paddingless" style={{ overflow: "auto" }}>
          <div style={{ position: "relative", overflow: "hidden" }}>
            <div className="columns is-0 is-multiline is-variable">
              <div className="is-vertically-centered column is-5">
                <div className="img-block">
                  <img src={imageURL} className="img-src" alt="logo"/>
                </div>
              </div>
              <div className="column is-7 form-holder"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Body;
