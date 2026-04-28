você é um programador pragmático e especialista em mineralogia, construa a base do mineraldb com o esqueleto atual do projeto

# mineraldb
o mineraldb é base de dados sobre todos os minerais catalogados pela IMA (Associação Internacional de Mineralogia) com um sistema de busca intuitivo por *propriedades macroscópicas* (por exemplo, dureza, cor, cor do traço, hábito), *propriedades químicas* (presença de determinado elemento, estrutura e organização iônica) e *localização geográfica*.

# aspectos técnicos
o site é construído com HTML e JS, os estilos são aplicados pelo Pico, um pequeno conjunto de css-classless semântico, você deve buscar escrever HTML semantico e seguir a ideia desse css, evite criar css novo a todo custo.

o sistema de pesquisa da barra deve ser dinamico e veloz, de modo que as consultas sejam velozes, o código deve ser limpo e otimizado, levando em consideração que a base de dados é um CSV ordenado alfabeticamente implemente um algoritmo binário de busca para os nomes de minerais.

todo o site deve ser em inglês e as informações técnicas em ingles, o código deve ser enxuto e veloz, dispensando comentarios e resolvendo os problemas do jeito mais simples

## página inicial
headerbar simples escrito "mineraldb"

barra de pequisa ao centro, ela deve ser capaz de entender se a informação é um nome, elemento ou propriedade do mineral e retornar resultados precisos.

cada elemento deve ter a sua própria página que agrega sua composição química e propriedades básicas, esta página deve ser construída de modo dinâmico pelo JS, com base numa estrutura CSV presente em "src/dataset/mineral-properties.csv", condensando suas informações de modo limpo e organizado.
