import { useParams, useNavigate } from "react-router-dom";
import PopBrowse from "../components/popups/PopBrowse/PopBrowse.jsx";
import { cardList } from "../data.js";

function CardPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const task = cardList.find((card) => card.id === Number(id));
  if (!task) return <div>Задача не найдена</div>;
  return <PopBrowse task={task} onClose={() => navigate(-1)} />;
}
export default CardPage;
