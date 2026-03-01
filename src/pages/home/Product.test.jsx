import { it, expect, describe,vi } from "vitest";
import { render,screen } from "@testing-library/react";
import Product from "./Product";

describe("product Component ", () => {
  it("displays the product correct ", () => {
    const product = {
      id: "901eb2ca-386d-432e-82f0-6fb1ee7bf969",
      image: "images/products/blackout-curtain-set-beige.jpg",
      name: "Blackout Curtains Set - Beige",
      rating: {
        stars: 4.5,
        count: 232,
      },
      priceCents: 4599,
      keywords: ["bedroom", "curtains", "home"],
    };
    const loadCart=vi.fn()
    render(<Product eachProduct={product} loadCart={loadCart} />);
     expect (screen.getByText('Blackout Curtains Set - Beige')).toBeInTheDocument();

     expect(screen.getByText('$45.99')).toBeInTheDocument();

     expect(screen.getByTestId('product-image')).toHaveAttribute(
        'src','images/products/blackout-curtain-set-beige.jpg'
     )
  });

 

});

