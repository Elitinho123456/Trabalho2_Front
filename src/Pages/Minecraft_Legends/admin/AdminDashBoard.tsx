import { useState } from 'react';
import { Link } from 'react-router-dom';
import './adminLegends.css';

interface MinecraftItem {
  id: string;
  name: string;
  type: 'Weapon' | 'Armor' | 'Consumable' | 'Artifact';
  rarity: 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary';
  power: number;
  description: string;
}

export default function AdminLegendsDashboard() {
  const [items, setItems] = useState<MinecraftItem[]>([
    {
      id: '1',
      name: 'Netherite Sword',
      type: 'Weapon',
      rarity: 'Legendary',
      power: 95,
      description: 'The most powerful weapon in Minecraft Legends',
    },
    {
      id: '2',
      name: 'Diamond Armor',
      type: 'Armor',
      rarity: 'Epic',
      power: 85,
      description: 'High protection against mobs',
    },
  ]);

  const [currentItem, setCurrentItem] = useState<MinecraftItem | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  // 🔹 CRUD Operations
  const handleCreate = () => {
    setCurrentItem(null);
    setIsEditing(true);
  };

  const handleEdit = (item: MinecraftItem) => {
    setCurrentItem(item);
    setIsEditing(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Delete this item?')) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const handleSave = (itemData: Omit<MinecraftItem, 'id'>) => {
    if (currentItem) {
      // Update
      setItems(
        items.map((item) =>
          item.id === currentItem.id ? { ...item, ...itemData } : item
        )
      );
    } else {
      // Create
      const newItem = {
        ...itemData,
        id: Date.now().toString(),
      };
      setItems([...items, newItem]);
    }
    setIsEditing(false);
  };

  // 🔹 Filter items
  const filteredItems = items.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="admin-container">
      <header className="admin-header">
        <h1>⚔️ Minecraft Legends Dashboard</h1>
        <nav>
          <Link to="/" className="nav-link">Back to Site</Link>
        </nav>
      </header>

      <div className="admin-content">
        {/* Search & Add Item */}
        <div className="admin-controls">
          <input
            type="text"
            placeholder="Search items..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={handleCreate} className="minecraft-button">
            + Add Item
          </button>
        </div>

        {/* Items Table */}
        {filteredItems.length === 0 ? (
          <p>No items found.</p>
        ) : (
          <table className="minecraft-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Type</th>
                <th>Rarity</th>
                <th>Power</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredItems.map((item) => (
                <tr key={item.id}>
                  <td>{item.name}</td>
                  <td>{item.type}</td>
                  <td className={`rarity-${item.rarity.toLowerCase()}`}>
                    {item.rarity}
                  </td>
                  <td>{item.power}</td>
                  <td className="actions">
                    <button
                      onClick={() => handleEdit(item)}
                      className="edit-button"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="delete-button"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Edit/Create Form */}
        {isEditing && (
          <div className="item-form">
            <h2>{currentItem ? 'Edit Item' : 'Create New Item'}</h2>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                const formData = new FormData(e.currentTarget);
                const itemData = {
                  name: formData.get('name') as string,
                  type: formData.get('type') as 'Weapon' | 'Armor' | 'Consumable' | 'Artifact',
                  rarity: formData.get('rarity') as 'Common' | 'Uncommon' | 'Rare' | 'Epic' | 'Legendary',
                  power: parseInt(formData.get('power') as string),
                  description: formData.get('description') as string,
                };
                handleSave(itemData);
              }}
            >
              <div className="form-group">
                <label>Name:</label>
                <input
                  name="name"
                  defaultValue={currentItem?.name || ''}
                  required
                />
              </div>

              <div className="form-group">
                <label>Type:</label>
                <select
                  name="type"
                  defaultValue={currentItem?.type || 'Weapon'}
                >
                  <option value="Weapon">Weapon</option>
                  <option value="Armor">Armor</option>
                  <option value="Consumable">Consumable</option>
                  <option value="Artifact">Artifact</option>
                </select>
              </div>

              <div className="form-group">
                <label>Rarity:</label>
                <select
                  name="rarity"
                  defaultValue={currentItem?.rarity || 'Common'}
                >
                  <option value="Common">Common</option>
                  <option value="Uncommon">Uncommon</option>
                  <option value="Rare">Rare</option>
                  <option value="Epic">Epic</option>
                  <option value="Legendary">Legendary</option>
                </select>
              </div>

              <div className="form-group">
                <label>Power (1-100):</label>
                <input
                  type="number"
                  name="power"
                  min="1"
                  max="100"
                  defaultValue={currentItem?.power || 50}
                  required
                />
              </div>

              <div className="form-group">
                <label>Description:</label>
                <textarea
                  name="description"
                  defaultValue={currentItem?.description || ''}
                  required
                />
              </div>

              <div className="form-actions">
                <button type="submit" className="save-button">
                  Save
                </button>
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="cancel-button"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
}