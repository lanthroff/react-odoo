import { useState, useEffect } from "react";
import { apiGet } from "../api";

function ListItem(props) {
  return <li>{props.value}</li>;
}

export default function Profile() {
  const [id, setId] = useState(0);
  const [name, setName] = useState("");
  const [cars, setCars] = useState([]);



  useEffect(() => {
    async function fetchData() {
      const res = await apiGet("/profile");
      return res
    }
    fetchData().then((response) => {
      if (response) {
        setId(response.data.user.id);
        setName(response.data.user.name);
        setCars(response.data.cars);
      };
    })
  }, []);
  return (
    <>
      <div className="col-12 d-flex justify-content-around">
        <div>
          <div>
            <h1 className="text-secondary">{name} (id:{id})</h1>
            <ul>
              <ul>
                {cars.map((car) =>
                  <ListItem key={car.toString()}
                    value={car} />
                )}
              </ul>
            </ul>
          </div>
        </div>
      </div>
    </>)
}