import Home, { getServerSideProps } from "../../pages/index";
import { render, screen, fireEvent } from "@testing-library/react";

const MOCK_COUNTRIES = [
  {
    id: "d7f5db46-f955-4248-bf57-0b763629de3e",
    name: "BHUTAN",
    code: "bhu",
    population: null,
  },
  {
    id: "8b579638-6488-499e-9aaa-06bb827c912a",
    name: "BOLIVIA",
    code: "bol",
    population: null,
  },
];

describe("Home page", () => {

  //@ts-ignore
  window.fetch = jest.fn(() =>
    Promise.resolve({
      json: () =>
        Promise.resolve({
          data: MOCK_COUNTRIES,
        }),
    })
  );

  it("getServerSideProps", async () => {
    const response = await getServerSideProps();

    expect(response).toEqual({
      props: {
        data: {
          data: MOCK_COUNTRIES,
        },
      },
    });
  });

  it("Form population handleChange", () => {
    render(<Home data={MOCK_COUNTRIES} />);

    const populationInput = screen.getByTestId("population");

    expect(populationInput).toHaveValue("0");

    fireEvent.change(populationInput, { target: { value: "1234" } });

    expect(populationInput).toHaveValue("1234");
  });

  it("Form name handleChange", () => {
    render(<Home data={MOCK_COUNTRIES} />);

    const nameSelect = screen.getByTestId("name");

    fireEvent.change(nameSelect, { target: { value: "BOLIVIA" } });

    expect(nameSelect).toHaveValue("BOLIVIA");
  });

  it("Form Submit", () => {
    render(<Home data={MOCK_COUNTRIES} />);

    const nameSelect = screen.getByTestId("name");

    fireEvent.change(nameSelect, { target: { value: "BOLIVIA" } });

    expect(nameSelect).toHaveValue("BOLIVIA");

    const populationInput = screen.getByTestId("population");

    expect(populationInput).toHaveValue("0");

    fireEvent.change(populationInput, { target: { value: "1234" } });

    expect(populationInput).toHaveValue("1234");

    const submitButton = screen.getByRole("button");

    fireEvent.click(submitButton);

    expect(populationInput).toHaveValue("0");
  });
});
