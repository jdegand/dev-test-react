import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { SetStateAction, useState } from "react";
import { Country, RootObject } from "@/interfaces";

export default function Home({ data }: RootObject) {
  const [population, setPopulation] = useState(0);

  const [name, setName] = useState("");

  const [id, setId] = useState(data[0].id);

  function handleSubmit(event: any) {
    event.preventDefault();
    // Read the form data
    const form = event.target;
    const formData = new FormData(form);
    // You can pass formData as a fetch body directly:
    const formJson = Object.fromEntries(formData.entries());
    fetch(`http://localhost:3000/api/countries/${id}`, {
      method: "put",
      body: JSON.stringify(formJson),
    });
    setPopulation(0);
  }

  const handleSelectChange = (event: {
    target: { value: SetStateAction<string> };
  }) => {
    setName(event.target.value);

    const selectedCountry = data.find(
      (country: Country) => country.name === event.target.value
    );

    selectedCountry && setId(selectedCountry.id);
  };

  return (
    <>
      <Head>
        <title>Dev Test React</title>
        <meta
          name="description"
          content="jdegand's solution to mizmoz's react dev test"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <h1>Dev Test React</h1>
        <form className={styles.form} method="put" onSubmit={handleSubmit}>
          <label htmlFor="name">Country</label>
          <select
            data-testid="name"
            id="name"
            name="name"
            value={name}
            onChange={handleSelectChange}
          >
            {data.map((country: Country) => {
              return (
                <option key={country.name} value={country.name}>
                  {country.name}
                </option>
              );
            })}
          </select>
          <input type="hidden" name="id" value={id} />
          <label htmlFor="population">Population</label>
          <input
            data-testid="population"
            id="population"
            type="text"
            pattern="[0-9]+"
            name="population"
            value={population}
            onChange={(event: any) => setPopulation(event.target.value)}
            required={true}
            title="Numbers only (no commas)"
          />
          <button>Submit</button>
        </form>
      </main>
    </>
  );
}

export async function getServerSideProps() {
  // Fetch data from external API
  const res = await fetch(`http://localhost:3000/api/countries`);
  const data = await res.json();

  // Pass data to the page via props
  return { props: { data } };
}
