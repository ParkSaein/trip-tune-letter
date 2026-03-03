@Service
@RequiredArgsConstructor
public class AiService {

    private final NewsletterRepository newsletterRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    public void generateFromPython() {
        String url = "http://localhost:5001/generate-newsletter";

        ResponseEntity<List<Map<String, Object>>> response =
                restTemplate.exchange(
                        url,
                        HttpMethod.GET,
                        null,
                        new ParameterizedTypeReference<List<Map<String, Object>>>() {}
                );

        List<Map<String, Object>> result = response.getBody();

        for (Map<String, Object> item : result) {
            Newsletter newsletter = new Newsletter();
            newsletter.setTitle((String) item.get("title"));
            newsletter.setSummary((String) item.get("summary"));
            newsletter.setLink((String) item.get("link"));
            newsletter.setMusicTitle((String) item.get("musicTitle"));
            newsletter.setMusicArtist((String) item.get("musicArtist"));
            newsletter.setMusicYoutube((String) item.get("musicYoutube"));
            newsletter.setDraft(true);

            newsletterRepository.save(newsletter);
        }
    }
}