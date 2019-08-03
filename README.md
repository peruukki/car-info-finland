# Finnish Car Information

A little script to analyze public Finnish car registry information from the
[Finnish Transport and Communications Agency open data](https://www.traficom.fi/en/statistics-and-publications/open-data).

## Example output

```
$ ./car-info process --CO2 96 --length 4059 --width 1780 --language en data/data.csv

Vehicles processed: 5054745

Cars with a known color value: 2673904/2684407 (100 %).
Proportions for color:
 1. Grey             22 % (586105)
 2. Red              15 % (412390)
 3. Blue             14 % (381905)
 4. Black            14 % (371631)
 5. White            12 % (314955)
 6. Silver            8 % (213826)
 7. Brown (beige)     8 % (201210)
 8. Green             5 % (138937)
 9. Yellow          0.9 % (25191)
10. Violet          0.5 % (13140)
11. Orange          0.4 % (9770)
12. Turquoise       0.1 % (3561)
13. Multi-coloured  0.0 % (1283)

Cars with a known length value: 2593796/2684407 (97 %).
Tendencies for length:
Mean:   4482
Median: 4510
Min:    40
Max:    13500
Percentile for 4059: 12 %

Cars with a known width value: 2683172/2684407 (100 %).
Tendencies for width:
Mean:   1772
Median: 1770
Min:    10
Max:    4934
Percentile for 1780: 52 %

Cars with a known CO2 value: 2261840/2684407 (84 %).
Tendencies for CO2:
Mean:   157
Median: 154
Min:    9
Max:    3150
Percentile for 96: 2 %

Cars with a known CO2 value: 2261840/2684407 (84 %).
Proportions for CO2:
A    4 % (84085)
B   15 % (339496)
C    8 % (184901)
D   20 % (446957)
E   26 % (589133)
F   15 % (345448)
G   12 % (271820)

Cars with a known power source value: 2684377/2684407 (100 %).
Proportions for power source:
 1. Petrol                                       71 % (1918811)
 2. Diesel fuel                                  28 % (752117)
 3. Petrol/CNG                                  0.2 % (5097)
 4. Petrol/Ethanol                              0.2 % (4139)
 5. Electricity                                 0.1 % (2952)
 6. CNG                                         0.0 % (919)
 7. Petrol/Electricity                          0.0 % (251)
 8. Petrol + light fuel oil (kerosene)          0.0 % (25)
 9. Other                                       0.0 % (14)
10. Diesel fuel / Electricity                   0.0 % (12)
11. Petrol/wood                                 0.0 % (8)
12. Petrol/Methanol                             0.0 % (5)
13. Diesel fuel / Biodiesel fuel                0.0 % (5)
14. Petrol/LPG                                  0.0 % (4)
15. Diesel fuel / CNG                           0.0 % (3)
16. Gas                                         0.0 % (3)
17. LPG                                         0.0 % (2)
18. Ethanol                                     0.0 % (2)
19. Wood                                        0.0 % (2)
20. Ethanol (E85)                               0.0 % (2)
21. Diesel fuel / Biodiesel fuel / Electricity  0.0 % (1)
22. Natural gas type HL                         0.0 % (1)
23. Biomethan                                   0.0 % (1)
24. Hydrogen                                    0.0 % (1)
25. Biodiesel fuel                                0 % (0)
26. Light fuel oil (kerosene)                     0 % (0)
27. Diesel/wood                                   0 % (0)
28. Diesel fuel / Ethanol                         0 % (0)
29. Diesel fuel / Methanol                        0 % (0)
30. Diesel fuel / LPG                             0 % (0)
31. Diesel fuel / Biodiesel fuel / Ethanol        0 % (0)
32. Diesel fuel / Biodiesel fuel / Methanol       0 % (0)
33. Diesel fuel / Biodiesel fuel / LPG            0 % (0)
34. Diesel fuel / Biodiesel fuel / CNG            0 % (0)
35. Hydrogen/Electricity                          0 % (0)
36. Diesel fuel / Other                           0 % (0)
37. Natural gas type H                            0 % (0)
38. Natural gas type L                            0 % (0)
39. Natural gas / Biomethane                      0 % (0)
40. Ethanol (ED95)                                0 % (0)
41. H2NG                                          0 % (0)
42. LNG                                           0 % (0)
43. LNG20                                         0 % (0)
44. Diesel/LNG                                    0 % (0)
45. Diesel/LNG20                                  0 % (0)
46. Fuel oil                                      0 % (0)
47. Methanol                                      0 % (0)
48. Not applicable                                0 % (0)

Cars with a known brand value: 2684384/2684407 (100 %).
Proportions for brand:
  1. Toyota                     14 % (362695)
  2. Volkswagen                 11 % (297316)
  3. Volvo                       8 % (224583)
  4. Ford                        7 % (191734)
  5. Mercedes-Benz               6 % (169712)
  6. Nissan                      6 % (161427)
  7. Opel                        5 % (139702)
  8. Skoda                       5 % (135409)
  9. Audi                        5 % (124331)
 10. BMW                         4 % (112846)
 11. Peugeot                     4 % (94833)
 12. Kia                         3 % (78667)
 13. Honda                       3 % (76332)
 14. Citroen                     2 % (66062)
 15. Renault                     2 % (65626)
 16. Mazda                       2 % (61803)
 17. Hyundai                     2 % (45319)
 18. Fiat                        2 % (44385)
 19. Mitsubishi                  1 % (30947)
 20. Seat                        1 % (30861)
 21. Saab                        1 % (27355)
 22. Subaru                    0.7 % (19293)
 23. Suzuki                    0.7 % (17563)
 24. Chrysler                  0.6 % (14916)
 25. Chevrolet                 0.5 % (14228)
 26. Dacia                     0.3 % (9162)
 27. Land Rover                0.2 % (6373)
 28. Lada                      0.2 % (5983)
 29. Lexus                     0.2 % (5722)
 30. Jaguar                    0.2 % (5528)
 31. Jeep                      0.2 % (5281)
 32. Mini                      0.2 % (5257)
 33. Alfa Romeo                0.2 % (4535)
 34. Dodge                     0.2 % (4411)
 35. Porsche                   0.1 % (3463)
 36. Adria                     0.1 % (1907)
 37. Smart                     0.1 % (1684)
 38. Cadillac                  0.1 % (1524)
 39. GM Daewoo                 0.1 % (1401)
 40. Tesla Motors              0.0 % (1207)
 41. Rover                     0.0 % (981)
 42. Datsun                    0.0 % (892)
 43. Daewoo                    0.0 % (809)
 44. Pontiac                   0.0 % (674)
 45. Capron                    0.0 % (625)
 46. Dethleffs                 0.0 % (602)
 47. Buick                     0.0 % (551)
 48. Hymer                     0.0 % (525)
 49. Daihatsu                  0.0 % (499)
 50. Hobby                     0.0 % (460)
 51. Lincoln                   0.0 % (449)
 52. Plymouth                  0.0 % (438)
 53. MG                        0.0 % (389)
 54. Lancia                    0.0 % (380)
 55. Talbot                    0.0 % (328)
 56. Triumph                   0.0 % (318)
 57. Quattro                   0.0 % (290)
 58. Austin                    0.0 % (284)
 59. Ssangyong                 0.0 % (282)
 60. Pössl                     0.0 % (277)
 61. Iveco                     0.0 % (272)
 62. Weinsberg                 0.0 % (264)
 63. LMC                       0.0 % (262)
 64. Burstner                  0.0 % (261)
 65. Mercury                   0.0 % (242)
 66. Morris                    0.0 % (241)
 67. Oldsmobile                0.0 % (234)
 68. Niva                      0.0 % (196)
 69. Moskvitsh                 0.0 % (189)
 70. Poessl                    0.0 % (173)
 71. Vauxhall                  0.0 % (158)
 72. Carthago                  0.0 % (154)
 73. Knaus                     0.0 % (137)
 74. DS                        0.0 % (132)
 75. Ferrari                   0.0 % (127)
 76. Rapido                    0.0 % (124)
 77. Rolls-Royce               0.0 % (116)
 78. Bürstner GmbH             0.0 % (114)
 79. GAZ                       0.0 % (101)
 80. Bentley                   0.0 % (100)
 81. MAN                       0.0 % (98)
 82. Isuzu                     0.0 % (94)
 83. GMC                       0.0 % (89)
 84. Simca                     0.0 % (85)
 85. Sunbeam                   0.0 % (80)
 86. Trabant                   0.0 % (78)
 87. PACKARD                   0.0 % (71)
 88. Maserati                  0.0 % (71)
 89. Rambler                   0.0 % (66)
 90. Willys                    0.0 % (63)
 91. Eura Mobil                0.0 % (62)
 92. Wartburg                  0.0 % (62)
 93. Scania                    0.0 % (55)
 94. Daimler                   0.0 % (52)
 95. Kabe                      0.0 % (51)
 96. Nilsson                   0.0 % (45)
 97. STUDEBAKER                0.0 % (44)
 98. Infiniti                  0.0 % (44)
 99. Sun Living                0.0 % (42)
100. Alpina                    0.0 % (39)
101. ELNAGH                    0.0 % (39)
102. Imperial                  0.0 % (39)
103. Auto-Union                0.0 % (37)
104. Concorde                  0.0 % (36)
105. Hillman                   0.0 % (35)
106. Neckar                    0.0 % (35)
107. DE SOTO                   0.0 % (34)
108. Lotus                     0.0 % (34)
109. AWE                       0.0 % (32)
110. IFA                       0.0 % (29)
111. Volga                     0.0 % (29)
112. BORGWARD                  0.0 % (28)
113. CI                        0.0 % (27)
114. NSU                       0.0 % (26)
115. DAF                       0.0 % (25)
116. Sea                       0.0 % (22)
117. FSO                       0.0 % (22)
118. Binz                      0.0 % (20)
119. Aston Martin              0.0 % (20)
120. Hummer                    0.0 % (20)
121. Autocaravans Rimor S.p.A  0.0 % (20)
122. Fendt                     0.0 % (19)
123. NASH                      0.0 % (19)
124. UAZ                       0.0 % (19)
125. Chausson                  0.0 % (17)
126. DKW                       0.0 % (16)
127. Steyr-Puch                0.0 % (16)
128. PLA                       0.0 % (15)
129. Solifer                   0.0 % (15)
130. MORGAN                    0.0 % (15)
131. Dreamer                   0.0 % (15)
132. Zastava                   0.0 % (15)
133. AC                        0.0 % (14)
134. Vaz                       0.0 % (14)
135. American                  0.0 % (14)
136. Busconcept                0.0 % (13)
137. LLOYD                     0.0 % (12)
138. Lamborghini               0.0 % (12)
139. EMW                       0.0 % (12)
140. MCLOUIS                   0.0 % (11)
141. Think                     0.0 % (11)
142. JOINT                     0.0 % (11)
143. GOGGOMOBIL                0.0 % (11)
144. KAISER                    0.0 % (10)
145. Morelo                    0.0 % (10)
146. LA STRADA                 0.0 % (9)
147. Sunlight                  0.0 % (9)
148. ACURA                     0.0 % (9)
149. JENSEN                    0.0 % (9)
150. STANDARD                  0.0 % (9)
151. Leyland                   0.0 % (9)
152. CORD                      0.0 % (8)
153. RIMOR                     0.0 % (8)
154. Commer                    0.0 % (8)
155. PANHARD                   0.0 % (8)
156. Puch                      0.0 % (8)
157. MATRA                     0.0 % (7)
158. BRAVIA                    0.0 % (7)
159. Itineo                    0.0 % (7)
160. Cuby                      0.0 % (7)
161. DESOTO                    0.0 % (7)
162. REO                       0.0 % (7)
163. AMC                       0.0 % (7)
164. GIOTTILINE                0.0 % (6)
165. Paragan                   0.0 % (6)
166. Westfalia                 0.0 % (6)
167. ESSEX                     0.0 % (6)
168. ADLER                     0.0 % (6)
169. AUBURN                    0.0 % (6)
170. Fisker                    0.0 % (6)
171. DONAU                     0.0 % (6)
172. VEDETTE                   0.0 % (6)
173. DE LOREAN                 0.0 % (5)
174. MOBILVETTA DESIGN         0.0 % (5)
175. DE TOMASO                 0.0 % (5)
176. VALIANT                   0.0 % (5)
177. ARMSTRONG                 0.0 % (4)
178. TRIGANO                   0.0 % (4)
179. MOBILVETTA                0.0 % (4)
180. ERA                       0.0 % (4)
181. Singer                    0.0 % (4)
182. T.E.C.                    0.0 % (4)
183. Fargo                     0.0 % (4)
184. HUMBER                    0.0 % (4)
185. CATERHAM                  0.0 % (4)
186. HUPMOBILE                 0.0 % (4)
187. RILEY                     0.0 % (4)
188. WOLSELEY                  0.0 % (4)
189. PIERCE-ARROW              0.0 % (4)
190. STX                       0.0 % (4)
191. Omavalmiste               0.0 % (4)
192. ZAZ                       0.0 % (4)
193. Autobianchi               0.0 % (4)
194. MUSTANG                   0.0 % (3)
195. GEO                       0.0 % (3)
196. GLAS                      0.0 % (3)
197. SATURN                    0.0 % (3)
198. ALLARD                    0.0 % (3)
199. DURANT                    0.0 % (3)
200. Goliath                   0.0 % (3)
201. CHECKER                   0.0 % (3)
202. Bertone                   0.0 % (3)
203. XGO                       0.0 % (3)
204. Maybach                   0.0 % (3)
205. Sisu                      0.0 % (3)
206. International             0.0 % (3)
207. Setra                     0.0 % (3)
208. CARLSSON                  0.0 % (3)
209. PMC                       0.0 % (3)
210. IZ                        0.0 % (3)
211. EAGLE                     0.0 % (3)
212. Goljat                    0.0 % (3)
213. REMETZ                    0.0 % (2)
214. MICRO-VETT                0.0 % (2)
215. Mc LOUIS                  0.0 % (2)
216. LAGONDA                   0.0 % (2)
217. BRICKLIN                  0.0 % (2)
218. FREIGHTLINER              0.0 % (2)
219. BUGATTI                   0.0 % (2)
220. ARMSTRONG SIDD            0.0 % (2)
221. ARMSTRONG SIDDE           0.0 % (2)
222. McLaren                   0.0 % (2)
223. Alvis                     0.0 % (2)
224. Carbodies                 0.0 % (2)
225. ERSKINE                   0.0 % (2)
226. HORCH                     0.0 % (2)
227. TVR                       0.0 % (2)
228. JOWETT                    0.0 % (2)
229. MARMON                    0.0 % (2)
230. Van Hool                  0.0 % (2)
231. OAKLAND                   0.0 % (2)
232. GRAHAM PAIGE              0.0 % (2)
233. Kissel                    0.0 % (1)
234. Variomobil                0.0 % (1)
235. Contemporary              0.0 % (1)
236. Delage                    0.0 % (1)
237. Polster                   0.0 % (1)
238. Panther                   0.0 % (1)
239. Challenger                0.0 % (1)
240. Gutbrod                   0.0 % (1)
241. Eunos                     0.0 % (1)
242. Gardner                   0.0 % (1)
243. De Dion-Bouton            0.0 % (1)
244. Kentucky Camp             0.0 % (1)
245. Nobel Art                 0.0 % (1)
246. SMZ                       0.0 % (1)
247. Frazer                    0.0 % (1)
248. Steyr                     0.0 % (1)
249. SHELBY                    0.0 % (1)
250. Overland                  0.0 % (1)
251. Scaletta                  0.0 % (1)
252. DeLorean                  0.0 % (1)
253. STEARNS - KNIGHT          0.0 % (1)
254. Festfalia Mobil           0.0 % (1)
255. Westfield                 0.0 % (1)
256. Shay                      0.0 % (1)
257. Umesläp                   0.0 % (1)
258. Invicta                   0.0 % (1)
259. STUTZ                     0.0 % (1)
260. ROLLER TEAM               0.0 % (1)
261. VIS                       0.0 % (1)
262. BL CARS (GB)              0.0 % (1)
263. MARCOS                    0.0 % (1)
264. Lorraine Dietrich         0.0 % (1)
265. VINTAGE AUTOWORKS         0.0 % (1)
266. Ghia                      0.0 % (1)
267. TEC                       0.0 % (1)
268. ELEGANT                   0.0 % (1)
269. Barkas                    0.0 % (1)
270. MONCAYO                   0.0 % (1)
271. Tiger                     0.0 % (1)
272. Hansa                     0.0 % (1)
273. Iso Rivolta               0.0 % (1)
274. MCC                       0.0 % (1)
275. Alpine                    0.0 % (1)
276. CROSLEY                   0.0 % (1)
277. BEZ MARKI KLAN            0.0 % (1)
278. Crestmobile               0.0 % (1)
279. BARKAS-VEB                0.0 % (1)
280. GENESIS                   0.0 % (1)
281. SPARTAN                   0.0 % (1)
282. LAIKA                     0.0 % (1)
283. KTM                       0.0 % (1)
284. TOYOPET                   0.0 % (1)
285. T.E.C                     0.0 % (1)
286. Berkeley                  0.0 % (1)
287. Land Mark                 0.0 % (1)
288. Graham                    0.0 % (1)
289. HENRY J                   0.0 % (1)
290. IRMSCHER                  0.0 % (1)
291. Nuffield                  0.0 % (1)
292. KS. HUOM.                 0.0 % (1)
293. Ameise                    0.0 % (1)
294. AWZ/ZWICKAU               0.0 % (1)
295. LA SALLE                  0.0 % (1)
296. ZAPOROJETZ                0.0 % (1)
297. VICTORIA                  0.0 % (1)
298. TEVE-VW-100L              0.0 % (1)
299. RUGBY                     0.0 % (1)
300. Tatra                     0.0 % (1)
301. DUAL GHIA                 0.0 % (1)
302. POBEDA                    0.0 % (1)
303. OSI                       0.0 % (1)
304. Monark                    0.0 % (1)
305. PEERLESS                  0.0 % (1)
306. AMPHICAR                  0.0 % (1)
307. POPEDA                    0.0 % (1)
308. WANDERER                  0.0 % (1)
309. ISOTTA FRASCHIN           0.0 % (1)
310. STANDART                  0.0 % (1)
311. WHITE                     0.0 % (1)
312. HOLDEN                    0.0 % (1)
313. STAR                      0.0 % (1)
314. PHÄNÖMOBIL                0.0 % (1)
315. BROUGH SUPERIOR           0.0 % (1)
316. PROTON                    0.0 % (1)
317. Pininfarina               0.0 % (1)
318. VELOREX                   0.0 % (1)
319. OSHKOSH MH                0.0 % (1)
320. WINNEBAGO                 0.0 % (1)
321. JAVELIN                   0.0 % (1)
322. METROPOLITAN              0.0 % (1)
323. BOND                      0.0 % (1)

Cars with a known transmission value: 1424300/2684407 (53 %).
Proportions for transmission:
1. Manual                      51 % (721159)
2. Automatic                   41 % (587265)
3. Stepless                     8 % (110902)
4. Other                      0.3 % (3645)
5. Not applicable             0.1 % (846)
6. Manual/automatic           0.0 % (429)
7. Foot-operated              0.0 % (23)
8. Variator                   0.0 % (21)
9. Continuously variable (?)  0.0 % (10)

Cars with a known electric hybrid value: 917754/2684407 (34 %).
Proportions for electric hybrid:
1. false   94 % (860504)
2. true     6 % (57250)
```

## Data processing

Some extra processing is done on the data.

### Filtering

The car records are filtered so that only vehicles of type "car" (transporting people, seating 1 to 8 people) are
included, so trucks, buses, motorcycles etc. are excluded. The filters are defined in [index.ts](src/index.ts):

```typescript
const filters: PropertyFilter[] = [
  { filter: new EnumFilter(), property: vehicleClass, acceptedValues: [vehicleClass.filterValues.car] },
];
```

### Normalizing

The car brand names appear in varying forms in the data, so some names are treated as the same brand:

1. known similar-looking names are matched
2. known abbreviations are matched with the longer brand name
3. if a brand name includes another brand name, and is less common than the included one, the brand names are matched;
   for example, "Toyota Motorsport" is matched with "Toyota"

This is by no means perfect, and there are some wrong matches, but it is good enough to cover the most common cases.

The known name and abbreviation mappings are defined in the car property's `normalizerMappings` field in
[brand.ts](src/carProperties/brand.ts):

```typescript
normalizerMappings: {
  aliases: {
    bww: 'bmw',
    mercedes: mercedesBenz,
    poessl: possl,
    pösll: possl,
    tesla: 'tesla motors',
    volswagen: volkswagen,
    vw: volkswagen,
    wolkswagen: volkswagen,
  },
  abbreviations: { vw: volkswagen, mb: mercedesBenz, 'm-b': mercedesBenz },
},
```

The normalizing logic is in [ProportionNormalizer.ts](src/normalizers/ProportionNormalizer.ts).

## Setting up

The car registry data is too large to include in this repository, so download it from the
[Finnish Transport and Communications Agency](https://www.traficom.fi/en/statistics-and-publications/open-data)
site (it's in the "Ajoneuvojen avoin data 5.4" section). You can put the file to the git-ignored `data` directory
in this repository.

## Building

```sh
npm run build
```

This compiles the TypeScript files in `src` into JavaScript in `dist`.

## Running

_Remember to run the build first (see above), otherwise you will get a `Cannot find module './dist/index'` error when running `car-info`._

Process the car info and show some interesting data:

```sh
./car-info process [options] <filename>

Options:
  -c, --CO2 <CO2 emissions in g/km>  show percentile for given CO2 emissions when compared to other cars
  -e, --length <length in mm>        show percentile for given length when compared to other cars
  -w, --width <width in mm>          show percentile for given width when compared to other cars
  -l, --language <language code>     language in which to show info labels: fi|sv|en (default: "fi")
  -h, --help                         output usage information
```

Example without options: `./car-info process data/data.csv`.

To get help:

```sh
./car-info -h
./car-info process -h
```

## Testing

Unfortunately no unit tests, but this runs the linter:

```sh
npm test
```

## License

[MIT](LICENSE)
