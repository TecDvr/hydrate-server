# Hydrate - Server

See this app live at: https://hydrate.now.sh/

## API Endpoints 

- GET /api/user - get all users in system 
- POST /api/user - register new users
- PATCH /api/textme/:id - opt in/out of text messages
- GET /api/sms - sendd text message
- POST /api/user/login - user login 
- GET /api/user/:id - get specific user profile
- POST /api/user/:id - edit water consumption goal 
- GET /api/user/waterconsumed/:user_id - get water consumed
- PATCH /api/user/waterconsumed/:user_id - update water consumed
- GET /api/user/water/week/:user_id - get water consumed for the week

## Background

Water is the source of all life. Unfortunately our daily lives have a habit of distracting us from drinking enough water, which can lead to dehydration. Dehydration may lead to dry skin, wrinkles, poor kidney functionality, decrease in physical performance, and a decrease in cognitive performance among many other adverse effects. 

Hydrate will help you keep track of your water consumption goal and daily intake, making it easy to remember to water your life!

### Technologies Used

#### Back-End
- Node.js
- Express.js
- PostgreSQL

## Description 

Hydrate users are able to set their initial water consumption goal which is based on the number of 8oz glasses of water they would like to consume throughout the day. Once a specific goal is set, users may add or subtract their daily water intake and have a visual reference of how close to their goal they are. Once a day is complete, users will be able to see a list of their past weeks consumption.

### Usage

- Users register to the application with a unique username and password
- Users determine their daily water consumption goal based on 8oz glasses of water
- Users add or subtract the amount of water they have consumed throughout the day
- Users have a visual reference of their goal and the amount of water that has been consumed throughout the week

## Sneak Peak of Hydrate

### Landing

![title screen](https://lh3.googleusercontent.com/0yRfSTHBG9lPhZBonlGMuXvVlHrFWvvOYPrR0DTrOyEVOmbOvPW_0pajiwpD4vUIwHj6wViyEHUlbQ71xu-YYyReVUXY0jeENNX-9L9iXwmhS9br9XFKT-EMT22PKmQON7Gcc4WdBXD11QsJU1vcqaBiPl55V13SAYfBasWSsJIbytFf8NZcxj7YYuOGooTqblNtrkZjWeKP_oQ_5OSl0p0iPRpNg6L0KPWuypI7kOFVj7fJc1XIQ775ExzstgpBaoYd9X3d5mdRsRpQff3arecZ7fkvDUr8mXIIQRcks1jtP3PP0g_7qvv1x16FblMsNOT56Ar9YUFuyeo3jtb4oc8qUWyxc5qPMung8T9Qytq8PmLwPT532oeaq1b0mGok35y7VdTyhoyrpV7IffG8VY0axMFnobC-FDbWcS8eRcRFHh4rj09VQFWViV7leA6PI01JZc8IGOPD2Gwrl74K4uLSemBB73WzLVVYpreFv8TOn3l4mB7Ppi7X8DttonMn5-15IZqhuROVm4LJmzbGRh7R9fJRMM3CFbrbU0WqEYV1VobhAV8XUoJMzyff5KG5-Jwjw6zz3kvMRsKUPe7RdB08CcS3hJKVzip47ntbtJheAFdzZBeWwiDQ9_H9zN05lSIIcQI8M3gyMGakSfRl6oEHBwECm45X4__CBCAs-V9XIm2yJ2tjsZIxS5xCVNQ04ZWK1tNfrApPtKWK97XzBYHpd1cdbceKvUfvUjsny9COnCQe=w419-h853-no)

### Login

![login screen](https://lh3.googleusercontent.com/ZKImgPZsl7Xq7Vozp8z1MFYlY9IJCYIzraqe84ABmRlLrYNlvCHBKRSp3HwOyrgFGoUJaHBDk-yeezeqV550NmjFwTQQCPoyjApt7bbfZobJdBMzwRyte-G35ulwP9a5JRSgaLkJX8cnWt0fAgxKNOsCQkz_DACRW2_L0NTt-y3gJlqVsOSlPGjUg6YXs__gvlztP94hBCYqLZn8-inY1orXPb8tqpTCNomd6F7cDFjhtPldBl9KmlTWmr3DMhpfyvDHjk_vsnfhE3Z4rt4NLvaeecS13kxxYo-WO8HGsFBLNEM2sP3Uq8jGzsfbLkH1WSjqBxXB5acR9NMflEsMCQg9CcsEa0VbmTaLjtnAbrHdpOT0uVRs55JJuJwR51l54VWwxze36H92DUW__TYRfTATiDgwmP4YQcUKU0D7IxYLLc_ZFuwriw0WcEHLLl4oD3-jipFQcchNMbfMFczr6UY0PuBASRh9GL0H_SJEUaqTQx3NAKKQV--OXQ-_f8kNA_ae0AVpBUzPM18LZnl-QFGQM2TC6ithcMShxK4hs_EvrigwRJwn6JwNe3A8veQxzKzIyLw3HASLQJdak3FmbxSBsmA2Ehs60FqAxwyaPUAEt6D2difnz1_SdcOzjvvIcUxMPIx5r92bdlNPBKBOmhzCmoL5cmqRwfS-el0KwPOfe6oZzcGHgW_16nzrVwCn0ltpkZ8eEWUBc4CnUX0A45KvL8ZdSfOLJ7pOw9gWiQcn2IbN=w422-h856-no)

### Learn About Hydrate

![learn screen](https://lh3.googleusercontent.com/tAoyOVyV84k6u_iyYAnGPEnn-cBiEypazcGSZbtTdfb3LfhHyy2Ye0dKLMzU3-sLYUCximHu7KY1MGZ13t5yn55LFSOzmaw2bdHbv5Xw967wez9qAgPjARdtXM8wgvMK0GYCfhSlnh7j4jQ6jE44mSguuYrPSU-Y66yaUtDoevXp8XIBcuBQLLCmaoZa2wyRGrmJmoqfKaAFGLum7gkGiv-HdQTav8cvwNDktbyAdO9CmQxG6-W_gqEpyrlWRSE_s6ClQaAGdsGtWhovrve9Ij7y5ecCuYM_qbPKLdY5I3xEDEw_xhG-iqundXYMrCL1gQ4_jC9Iew-FTJAmNZ_iAb-y6_3D8fzz0_I-K2kQkQfH-GGtdxsfZsKLVG6Mh7otUuMuZczzz1T4v99Z_feOavkmaUbq66S-TLyUhfE36oVlvwDWjrFM9lLeOecgszmCYAFOsfpOkGfOFC3_69b1uou1dcKCwKpfGJEVMf_WTFe2mZfT1kC3zqUq60JvVvH9-GN3A4WCmiYfR641cjF79tnPXEVGqKAPRU_AH-9uKaVW2r-_cS3xi-vRe23lXYHCA6PQBIGBpUhEvY3oMUxsugdr9buEbtkBiEu0TPQK8XC03VrGzEwNPmkrB68o-MqHgT73vMScaqXB2jrXOk7pJpBdTQedpykzJ4d93UtAAOT9MO57mbDEO0PzdUw1ZxJtWpl_l_mZih9uleKK9B6zqkktIqTNR9WJRWU4qNj8JfVG3p9Y=w420-h855-no)

![learn screen](https://lh3.googleusercontent.com/jbWqSnpp1qL7pr_cCSm7xact-xnSSpAaDj4LemxgTG0LTqW6Xadp70X1caFPuBVjyx2vy7snc4CM1JuV1N2pn77hITprgX_7y8R5wAEfTuj_3WeRNcwVScwAmV3Fn-lOV-n5t7xa8LobvuINlzrgGcAsGIgjxaEV7tatwVd99EXUfjH9Hip4e-9cd3hFLJ-lnfsYpzPte3sXP6fUHKd7vm8u2BCdAf-nGkynzmzJ-cY80UBQrnhOT2wsXu_ry_llax_zWpPeRPEuveUalIhSTAubBOifrSLUiFMyFEVJ0BIN1j6pqBlQtjPfSaioLvPan9Kc3PI26Z0ixLOs2RMV8WZlBy2jWlcEA5yDB3CVDZkHe2lOA8Lb0_kbD9Y9-W6KmpjC5SZCkJ_FqZsA1J9p4gB_j8lLJDdAuJGubNAQFcuBpNUmcIikK9T962bXzFQiqScSpW3GVlLSQqH7Uomahrd1Pbw1ZMveJH1yb1K34445Ya_QXUj8zKNM6xzJh4gR_la9YQ6LcuyUL0va8awcdkadFFmRbMP4qslCdOujsKw5MIav7azvr8dv-U4sQXt7Jn34xBGD1ojc2I4maOFD3joJFKNYEaXfI8ALpOk9sAprhE0mQj2OO7wX7eOlSwJ12aZf9eOPVC4EtzQesVNSQn3nCdXkF5oRM_VkKabcuHYnfxSnunORYzpcEfEqlxrW6Ituy4jcK2q7k4pIwqkiZjPzFzokUvoxGioBskocJpSK6d7M=w420-h857-no)

### Register New User

![registration screen](https://lh3.googleusercontent.com/THUy0vcMPFR9L2azIjq8oTNtHlRuB6-ICuPb-iE4mpb_8QnpjVMaDy4YbswMd50FNP3VBmbN8a6-uNfTQqi4jnztc5CV8mFzrxvPZbUBJxDN-gYPS39JFBtPHnx0Z9M5aBwPenWLQ-rXAE8D7l_-JibY6Se2q3As3GwFsjmKpITzhcBxIAcLRb2WiwsRhaNCYfjaOX7X115Ra_sfqMW2SVLAa_xgjsYC77EbKOIWlD1-Ewg50fhB4Nl59wtcW-JyuCjD720fX48yFLRvUKWcwg9bsAJP3Qk5MmWMvStJDD2DYaJgSd9FcFzv8x-_DNthTeDGmeMZ4TszjYePcs4kxVYafHNYtHjOorqHDTjS1IdSpnHAfq1-WsVeQ8aWT3qSaRVWJ17X_Cv0sbaNjYVzhcpODtr2Ld_NcTP5BowIvkTJX6fKBvXwmsA9YJkRpCanDyC_JNF8-4XRepzLmb27YRkN0J6V0eFY_158xdqoCfB3ncUg0IHN3UkMuEFGCGGbmpXPx3fg2Q8xXoqbm5_kXw2lCJRvyg52GrHoW98XXi4gCIz1I7iJ3Zq5aQxPmuxSey0hIVHTfVowOf6SJCI1X5xfbI9vQRy4OqvBJVnE8C1alpzTCS2e2VDuof_RAvEHsQqTC9dYordjPWP2KVhjFQbx0jOPSxeQzUGj0_YJz5TTT1Iae0btDzsCMvfHf-IEkUPD7MBsigRmzGNVKNUPpTjr8UlKT4QMdEkO8wObRlzUE6sH=w421-h854-no)

### Water Consumption Goals

![UI screen](https://lh3.googleusercontent.com/A3CchaXcNWEBlKNXei-G0QJC93fEJr2c-9wrN06ZL-N73UQzlyGEMc-adaVImr6Z37maVlYjX5OJHdk02yGelThiIlxCIiX2VI4v_LYZqUobBRBYMi6Gr3GC-KWOD0O9KpCqvXiuY1j28igRcNx7sU2_j8lytGsxSeOgWo4lfV6c-eLBGYQtiCHmPEKXmek7dAaY19gP0kAwi_pZK3UobXtMlTtMrQmJwCQqQ9OyTdzBGwJMVknGDAzkeqrvtryyySvo89JqBQhVZkcbm__TxdEJzcKH_BoVGGmPD6rCUljHcsjJEFW1vpJkNL2nXYni8G9PEKw1rrBDkL_eUzcnpi_5lNyFBp_b9zrGBLlZyxdck4AN_hBkmRpt_wTALQwfj5SOxbkN-L8bpbL2DcLiQVDvI35vLrLXg7JZexDtn7T9ziSl8WgfonLVZm0DTclu8iC5gHgo2ZIjdYwpiKwULADMaHM6bl97FcVJSBjcoOJXoxgnuDGzdu86JfPC0dSluqIF1sE9K9yAC9w30RMmfs1BuvzQjlr5ZK9GAfc2oNWUoR4gi0zw9cTbmGrBYMVQRcOXV8HFy2EyNDJe0l8Dn7yxKtOs3RT9Wf0vT8YhvtWRsirbZq91p5wkyoEVpfrvQlGRexGy4yoTeEgG8vAZ3UXbKujejVaGMAPWWXvoMObVweZb63wUs1v9J1QcJq2kvWpltb6wJnvJHyZQZ2RVi_75E64EPZdXLOJaSFhxWj2tRUBl=w422-h857-no)

## Coming Soon!

### Version 2

- Users will be able to edit consumption goals and have more control over the size of glasses drank
- More secure authentication process
- UI update including but not limited to display color warnings, chart functionality
- Text message alerts as to when a glass of water should be consumed. Intervals set by user with consideration to their awake hours
- Transition animations

### ENJOY!

