"use client";
import React, { useState } from 'react';

const NameForm = () => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('');
  const [country, setCountry] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const agifyResponse = await fetch(`https://api.agify.io?name=${name}`);
      const agifyData = await agifyResponse.json();
      setAge(agifyData.age);

      const genderizeResponse = await fetch(`https://api.genderize.io?name=${name}`);
      const genderizeData = await genderizeResponse.json();
      setGender(genderizeData.gender);

      const nationalizeResponse = await fetch(`https://api.nationalize.io?name=${name}`);
      const nationalizeData = await nationalizeResponse.json();
      // For simplicity, just display the first country in the list
      if (nationalizeData.country.length > 0) {
        setCountry(nationalizeData.country[0].country_id);
      } else {
        setCountry('Unknown');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Loading...' : 'Submit'}
        </button>
      </form>
      {age && <p>Age: {age}</p>}
      {gender && <p>Gender: {gender}</p>}
      {country && <p>Country: {country}</p>}
    </div>
  );
};

export default NameForm;
