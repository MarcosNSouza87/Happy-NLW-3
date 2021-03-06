import React from 'react';
import { FiArrowLeft } from 'react-icons/fi';
import { useHistory } from 'react-router-dom';

import mapMarkerImg from "../Images/mapMarker.svg";

import '../styles/components/Sidebar.css';

export default function Sidebar() {
  const { goBack } = useHistory();

  return (
    <aside className="sidebar">
      <img src={mapMarkerImg} alt="Happy" />

      <footer>
        <button type="button" onClick={goBack}>
          <FiArrowLeft size={24} color="#FFF" />
        </button>
      </footer>
    </aside>
  );
}