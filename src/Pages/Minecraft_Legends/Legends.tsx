import { Link } from 'react-router-dom';
import './Legends.css';

export default function LegendsPage() {
  return (
    <div className="legends-container">
      <h1>Welcome to Minecraft Legends</h1>
      <p>Explore the world of Minecraft Legends</p>
      
      <div className="featured-items">
        <h2>Featured Items</h2>
        {/* Items would be listed here */}
      </div>

      <Link to="/admin" className="minecraft-button">
        Go to Admin Panel
      </Link>
    </div>
  );
}
