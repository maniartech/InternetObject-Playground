const schema = `
# The products schema, defines the structure of the products data
pid: {string, pattern: r'[a-z0-9]{8}-[a-z0-9]{4}-[a-z0-9]{4}'},
name: string,       # The product name
shortDesc: string,  # The short description of the product
image: url,         # The product image URL
price: number,      # The product price
isAvailable: bool,  # The availability of the product
category: { string, choices: [electronics, fashion, home, kitchen, sports] }, # The product category
offer?: { # Optional
  discount: number,     # The discount value
  validTill: datetime   # The offer valid till date
},
tags: [string]      # The product tags
`.trim()

const doc = `
~ success: T
~ errorMessage: N
~ recordCount: 102
~ pageNo: 11
~ nextPage: /api/v1/products?page=10
~ prevPage: /api/v1/products?page=12
---
~ 1a2b3c4d-5e6f-7g8h, Apple iPhone 13, The latest iPhone, "https://example.com/iphone13.jpg", 999.99, T, electronics, {10, d'2022-12-31'}, [apple, iphone, smartphone]
~ 2b3c4d5e-6f7g-8h9i, Samsung Galaxy S21, The latest Samsung Galaxy, "https://example.com/samsungs21.jpg", 899.99, T, electronics, {15, d'2022-12-31'}, [samsung, galaxy, smartphone]
~ 3c4d5e6f-7g8h-9i0j, Sony PlayStation 5, The latest PlayStation, "https://example.com/ps5.jpg", 499.99, T, electronics,, [sony, playstation, gaming]
~ 4d5e6f7g-8h9i-0j1k, Apple MacBook Pro, The latest MacBook, "https://example.com/macbookpro.jpg", 1999.99, T, electronics, {25, d'2022-12-31'}, [apple, macbook, laptop]
~ 5e6f7g8h-9i0j-1k2l, Nike Air Zoom Pegasus 38, The latest Nike shoes, "https://example.com/nikeairzoom.jpg", 129.99, T, sports,, [nike, shoes, running]
~ 6f7g8h9i-0j1k-82l3, Adidas Ultraboost 21, The latest Adidas shoes, "https://example.com/adidasultraboost.jpg", 149.99, T, sports, {35, d'2022-12-31'}, [adidas, shoes, running]
~ 7g8h9i08-1j2k-5m68, Samsung Galaxy Watch 4, The latest Samsung smartwatch, "https://example.com/samsungwatch.jpg", 299.99, T, electronics, {40, d'2022-12-31'}, [samsung, watch, smartwatch]
~ 8h9i03j1-2k35-6nrp, Apple AirPods Pro, The latest Apple earbuds, "https://example.com/airpodspro.jpg", 199.99, T, electronics, {45, d'2022-12-31'}, [apple, airpods, earbuds]
~ 9i0j1kf2-3l46-7o8q, Sony WH-1000XM4, The latest Sony headphones, "https://example.com/sonywh1000xm4.jpg", 349.99, T, electronics,, [sony, headphones, wireless]
~ 0j1k2lf3-4m57-8p9r, Apple Watch Series 7, The latest Apple smartwatch, "https://example.com/applewatch.jpg", 399.99, T, electronics, {55, d'2022-12-31'}, [apple, watch, smartwatch]
~ 1k2l3m44-5n68-9q0s, Bose QuietComfort 45, The latest Bose headphones, "https://example.com/boseqc45.jpg", 299.99, T, electronics, {60, d'2022-12-31'}, [bose, headphones, wireless]
~ 2l3m4dn5-6o79-0r1t, GoPro Hero 10, The latest GoPro camera, "https://example.com/goprohero10.jpg", 399.99, T, electronics,, [gopro, camera, action]
~ 3m4nc5c6-7p80-1s2u, Canon EOS R5, The latest Canon camera, "https://example.com/canoneosr5.jpg", 3999.99, T, electronics, {70, d'2022-12-31'}, [canon, camera, mirrorless]
~ 4n5o6cp7-8q91-2t3v, Sony A7 IV, The latest Sony camera, "https://example.com/sonya7iv.jpg", 2499.99, T, electronics, {75, d'2022-12-31'}, [sony, camera, mirrorless]
~ 5o6p7cq8-9r02-3u4w, Nikon Z9, The latest Nikon camera, "https://example.com/nikonz9.jpg", 5499.99, T, electronics,, [nikon, camera, mirrorless]
~ 6p7q8rd9-0s13-4v5x, Canon EOS R3, The latest Canon camera, "https://example.com/canoneosr3.jpg", 5999.99, T, electronics, {85, d'2022-12-31'}, [canon, camera, mirrorless]
~ 7q8r9ds0-1t24-5w6y, Sony A1, The latest Sony camera, "https://example.com/sonya1.jpg", 6499.99, T, electronics,, [sony, camera, mirrorless]
~ 8r9s0st1-2u35-6x7z, Nikon Z7 II, The latest Nikon camera, "https://example.com/nikonz7ii.jpg", 2999.99, T, electronics, {95, d'2022-12-31'}, [nikon, camera, mirrorless]
~ 9s0t1fu2-3v46-7y8a, Canon EOS R6, The latest Canon camera, "https://example.com/canoneosr6.jpg", 2499.99, T, electronics, {100, d'2022-12-31'}, [canon, camera, mirrorless]
~ 0t1u2cv3-4w57-8z9b, Nikon Z6 II, The latest Nikon camera, "https://example.com/nikonz6ii.jpg", 1999.99, T, electronics,, [nikon, camera, mirrorless]
~ 1u2vg3w4-5x68-9a0c, Canon EOS R5 C, The latest Canon camera, "https://example.com/canoneosr5c.jpg", 4499.99, T, electronics, {110, d'2022-12-31'}, [canon, camera, cinema]
~ 2v3wf4x5-6y79-0b1d, Nikon Z9 II, The latest Nikon camera, "https://example.com/nikonz9ii.jpg", 5999.99, T, electronics,, [nikon, camera, mirrorless]
~ 3w4x5ff6-7z80-1c2e, Canon EOS R3 C, The latest Canon camera, "https://example.com/canoneosr3c.jpg", 6499.99, T, electronics,, [canon, camera, cinema]
`.trim()

const exportable = {
  doc,
  schema,
  name: 'REST API Collection Response',
  id: 'rest-api-collection-response',
  schemaPanelHeight: 300,
}

export default exportable;
