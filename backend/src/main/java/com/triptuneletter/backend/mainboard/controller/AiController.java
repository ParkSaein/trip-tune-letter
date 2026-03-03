@RestController
@RequiredArgsConstructor
@RequestMapping("/admin/ai")
public class AiController {

    private final AiService aiService;

    @PostMapping("/generate")
    public String generate() {
        aiService.generateFromPython();
        return "임시 저장 완료";
    }
}