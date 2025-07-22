import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/answers")
public class AnswerController {
    private final AnswerService service;

    public AnswerController(AnswerService service) {
        this.service = service;
    }

    @PostMapping
    public Answer submit(@RequestBody Answer answer) {
        return service.saveAnswer(answer);
    }

    @GetMapping("/evaluator/{id}")
    public List<Answer> getByEvaluator(@PathVariable String id) {
        return service.getAnswersByEvaluator(id);
    }
}
